import { readFileSync } from 'node:fs'
import { writeFile }    from 'node:fs/promises'
import { chmod }        from 'node:fs/promises'
import { join }         from 'node:path'

import { Builder }      from '@monstrs/libcnb'
import { BuildContext } from '@monstrs/libcnb'
import { BuildResult }  from '@monstrs/libcnb'
import { Process }      from '@monstrs/libcnb'

export class YarnWorkspaceStartBuilder implements Builder {
  async build(ctx: BuildContext): Promise<BuildResult> {
    const pkgjson = JSON.parse(readFileSync(join(ctx.applicationDir, 'package.json'), 'utf-8'))

    const command = pkgjson.scripts.start
    const nodeOptions = ['--require', join(ctx.applicationDir, '.pnp.cjs')].join(' ')

    const result = new BuildResult()

    await writeFile('/workspace/run.sh', `#!/usr/bin/env bash\nexport NODE_OPTIONS="${nodeOptions}"\n${command}`)
    await chmod('/workspace/run.sh', '755')

    result.launchMetadata.processes.push(new Process('web', './run.sh', [], true, true))

    const nodeOptionsLayer = await ctx.layers.get('node-options', true, true, true)

    nodeOptionsLayer.launchEnv.append(
      'NODE_OPTIONS',
      nodeOptions,
      ' '
    )

    return result
  }
}
