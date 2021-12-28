import { Detector }      from '@monstrs/buildpack-core'
import { DetectContext } from '@monstrs/buildpack-core'
import { DetectResult }  from '@monstrs/buildpack-core'

export class YarnWorkspacePackDetector implements Detector {
  async detect(ctx: DetectContext): Promise<DetectResult> {
    if (!process.env.WORKSPACE) {
      return null
    }

    return {
      provides: [
        {
          name: 'yarn-workspace-pack',
        },
      ],
      requires: [
        {
          name: 'yarn-workspace-pack',
          metadata: {
            workspace: process.env.WORKSPACE,
          },
        },
      ],
    }
  }
}
