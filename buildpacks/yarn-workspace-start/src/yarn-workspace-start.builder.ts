import { writeFile }    from 'node:fs/promises'
import { chmod }        from 'node:fs/promises'
import { join }         from 'node:path'

import execa                from 'execa'
import fs                   from 'fs'
import path                 from 'path'
import { readFileSync }     from 'fs'

import { Builder }      from '@monstrs/buildpack-core'
import { BuildContext } from '@monstrs/buildpack-core'
import { BuildResult }  from '@monstrs/buildpack-core'
import { Process }      from '@monstrs/buildpack-core'

export class YarnWorkspaceStartBuilder implements Builder {
  async build(ctx: BuildContext): Promise<BuildResult> {
    const { stdout } = await execa('yarn', ['workspaces', 'list', '--json'])

    const workspaces = stdout.split('\n').map((item) => JSON.parse(item))

    const workspace = workspaces.find(({ name }) => name === process.env.WORKSPACE)

    const entrypoint = `${workspace.location}/dist/index.js`

    const pkgjson = JSON.parse(readFileSync(join(workspace.location, 'package.json'), 'utf-8'))

    const entry = ctx.plan.entries[0]

    const location = workspace.location
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
    console.log('build - sfsdfsfsd')
    return result
  }
}
