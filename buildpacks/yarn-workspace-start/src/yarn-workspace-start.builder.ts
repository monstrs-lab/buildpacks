import { Builder }      from '@monstrs/buildpack-core'
import { BuildContext } from '@monstrs/buildpack-core'
import { BuildResult }  from '@monstrs/buildpack-core'

export class YarnWorkspaceStartBuilder implements Builder {
  async build(ctx: BuildContext): Promise<BuildResult> {
    const entry = ctx.plan.getEntry('yarn-workspace-start')
    const entrypoint = entry?.metadata?.entrypoint || 'dist/index.js'

    ctx.addWebProcess(['node', '-r', './.pnp.cjs', entrypoint])
  }
}
