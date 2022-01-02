import { readFileSync } from 'node:fs'
import { writeFile }    from 'node:fs/promises'
import { chmod }        from 'node:fs/promises'
import { join }         from 'node:path'

import execa            from 'execa'

import { Builder }      from '@monstrs/libcnb'
import { BuildContext } from '@monstrs/libcnb'
import { BuildResult }  from '@monstrs/libcnb'
import { Process }      from '@monstrs/libcnb'

export class YarnWorkspaceStartBuilder implements Builder {
  async build(ctx: BuildContext): Promise<BuildResult> {
    const { stdout } = await execa('yarn', ['workspaces', 'list', '--json'])

    const workspaces = stdout.split('\n').map((item) => JSON.parse(item))

    const workspace = workspaces.find(({ name }) => name === process.env.WORKSPACE)

    const pkgjson = JSON.parse(readFileSync(join(workspace.location, 'package.json'), 'utf-8'))

    const { location } = workspace
    const command = pkgjson.scripts.start

    const result = new BuildResult()

    await writeFile('/workspace/run.sh', `#!/usr/bin/env bash\ncd ${location} && ${command}`)
    await chmod('/workspace/run.sh', '755')

    result.launchMetadata.processes.push(new Process('web', './run.sh', [], true, true))

    const nodeOptionsLayer = await ctx.layers.get('node-options', true, true, true)

    nodeOptionsLayer.launchEnv.append(
      'NODE_OPTIONS',
      ['--require', join(ctx.applicationDir, '.pnp.cjs')].join(' '),
      ' '
    )

    return result
  }
}
