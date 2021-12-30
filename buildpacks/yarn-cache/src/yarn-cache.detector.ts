import { existsSync } from 'node:fs'
import { join } from 'node:path'

import { Detector }      from '@monstrs/buildpack-core'
import { DetectContext } from '@monstrs/buildpack-core'
import { DetectResult }  from '@monstrs/buildpack-core'

export class YarnCacheDetector implements Detector {
  async detect(ctx: DetectContext): Promise<DetectResult> {
    if (!existsSync(join(ctx.workingDir, 'yarn.lock'))) {
      return null
    }

    if (!existsSync(join(ctx.workingDir, '.yarn/cache'))) {
      return null
    }

    return {
      provides: [
        {
          name: 'yarn-cache',
        },
      ],
      requires: [
        {
          name: 'yarn-cache',
        },
      ],
    }
  }
}
