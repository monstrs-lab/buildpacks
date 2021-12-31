import { access } from 'node:fs/promises'
import { join }              from 'node:path'

import { Detector }      from '@monstrs/buildpack-core'
import { DetectContext } from '@monstrs/buildpack-core'
import { DetectResult }  from '@monstrs/buildpack-core'

export class YarnInstallDetector implements Detector {
  async detect(ctx: DetectContext): Promise<DetectResult> {
    try {
      await access(join(ctx.workingDir, 'yarn.lock'))
      await access(join(ctx.workingDir, '.yarn/cache'))
    } catch {
      return null
    }

    return {
      provides: [
        {
          name: 'yarn-install',
        },
      ],
      requires: [
        {
          name: 'yarn-install',
        },
      ],
    }
  }
}
