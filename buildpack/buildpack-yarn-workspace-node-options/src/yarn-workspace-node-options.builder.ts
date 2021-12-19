import { Builder }      from '@monstrs/buildpack-core'
import { BuildContext } from '@monstrs/buildpack-core'
import { BuildResult }  from '@monstrs/buildpack-core'

export class YarnWorkspaceNodeOptionsBuilder implements Builder {
  async build(ctx: BuildContext): Promise<BuildResult> {
    const entry = ctx.plan.getEntry('yarn-workspace-node-options')

    const { nodeOptions }: { nodeOptions?: string } = entry?.metadata || {}

    if (nodeOptions) {
      ctx.addLaunchEnv('NODE_OPTIONS', nodeOptions)
    }
  }
}
