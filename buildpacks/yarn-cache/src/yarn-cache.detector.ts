import { access }        from 'node:fs/promises'
import { join }          from 'node:path'

import { Detector }      from '@monstrs/libcnb'
import { DetectContext } from '@monstrs/libcnb'
import { DetectResult }  from '@monstrs/libcnb'

export class YarnCacheDetector implements Detector {
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
