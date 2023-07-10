import type { Detector }      from '@monstrs/libcnb'
import type { DetectContext } from '@monstrs/libcnb'

import { DetectResult }       from '@monstrs/libcnb'

export class YarnWorkspaceStartDetector implements Detector {
  async detect(_: DetectContext): Promise<DetectResult> {
    const result = new DetectResult()

    result.passed = true

    return result
  }
}
