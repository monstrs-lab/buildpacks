import { Detector }      from '@monstrs/buildpack-core'
import { DetectContext } from '@monstrs/buildpack-core'
import { DetectResult }  from '@monstrs/buildpack-core'

export class YarnWorkspaceBuildDetector implements Detector {
  async detect(ctx: DetectContext): Promise<DetectResult> {
    if (!process.env.WORKSPACE) {
      return null
    }

    return {
      provides: [
        {
          name: 'yarn-workspace-build',
        },
      ],
      requires: [
        {
          name: 'yarn-workspace-build',
          metadata: {
            workspace: process.env.WORKSPACE,
          },
        },
      ],
    }
  }
}
