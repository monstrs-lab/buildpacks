import { Detector }      from '@monstrs/libcnb'
import { DetectContext } from '@monstrs/libcnb'
import { DetectResult }  from '@monstrs/libcnb'

export class YarnWorkspaceStartDetector implements Detector {
  async detect(ctx: DetectContext): Promise<DetectResult> {
    const result = new DetectResult()

    if (!process.env.WORKSPACE) {
      return result
    }

    result.passed = true

    return result
  }
}
