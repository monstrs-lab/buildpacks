import { writeFile }    from 'node:fs/promises'
import { chmod }        from 'node:fs/promises'
import { join }         from 'node:path'

import { Builder }      from '@monstrs/buildpack-core'
import { BuildContext } from '@monstrs/buildpack-core'
import { BuildResult }  from '@monstrs/buildpack-core'
import { Process } from '@monstrs/buildpack-core'

export class YarnWorkspaceStartBuilder implements Builder {
  async build(ctx: BuildContext): Promise<BuildResult> {
    const entry = ctx.plan.entries[0]

    const location = entry?.metadata?.location || '/workspace'
    const command = entry?.metadata.command

    const result = new BuildResult()

    await writeFile('/workspace/run.sh', `#!/usr/bin/env bash\ncd ${location} && ${command}`)
    await chmod('/workspace/run.sh', '755')

    result.launchMetadata.processes.push(
      new Process(
        'web',
        './run.sh',
        [],
        true
      )
    )

    const nodeOptionsLayer = await ctx.layers.get('node-options', true, true, true)

    nodeOptionsLayer.launchEnv.append(
      'NODE_OPTIONS',
      ['--require', join(ctx.applicationDir, '.pnp.cjs')].join(' '),
      ' '
    )

    return result
  }
}
