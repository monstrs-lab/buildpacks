import { writeFile }    from 'node:fs/promises'
import { chmod }        from 'node:fs/promises'
import { join }         from 'node:path'

import { Builder }      from '@monstrs/buildpack-core'
import { BuildContext } from '@monstrs/buildpack-core'
import { BuildResult }  from '@monstrs/buildpack-core'

export class YarnWorkspaceStartBuilder implements Builder {
  async build(ctx: BuildContext): Promise<BuildResult> {
    const entry = ctx.plan.getEntry('yarn-workspace-start')

    const location = entry?.metadata?.location || '/workspace'
    const command = entry?.metadata.command

    await writeFile('/workspace/run.sh', `#!/usr/bin/env bash\ncd ${location} && ${command}`)
    await chmod('/workspace/run.sh', '755')

    ctx.addWebProcess(['./run.sh'])

    const nodeOptionsLayer = await ctx.layers.get('node-options', true, true, true)

    nodeOptionsLayer.launchEnv.append(
      'NODE_OPTIONS',
      ['--require', join(ctx.workingDir, '.pnp.cjs')].join(' '),
      ' '
    )
  }
}
