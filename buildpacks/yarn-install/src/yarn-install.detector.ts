import type { Detector }      from '@monstrs/libcnb'
import type { DetectContext } from '@monstrs/libcnb'

import { access }             from 'node:fs/promises'
import { join }               from 'node:path'

import { DetectResult }       from '@monstrs/libcnb'

export class YarnInstallDetector implements Detector {
  async detect(ctx: DetectContext): Promise<DetectResult> {
    const result = new DetectResult()

    try {
      await access(join(ctx.applicationDir, 'yarn.lock'))
      await access(join(ctx.applicationDir, '.yarn/cache'))
    } catch {
      return result
    }

    result.passed = true

    return result
  }
}
