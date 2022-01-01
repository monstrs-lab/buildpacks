import { access }           from 'node:fs/promises'
import { join }             from 'node:path'

import { Detector }         from '@monstrs/buildpack-core'
import { DetectContext }    from '@monstrs/buildpack-core'
import { DetectResult }     from '@monstrs/buildpack-core'
import { BuildPlan }        from '@monstrs/buildpack-core'
import { BuildPlanProvide } from '@monstrs/buildpack-core'

export class YarnInstallDetector implements Detector {
  async detect(ctx: DetectContext): Promise<DetectResult> {
    const result = new DetectResult()

    try {
      await access(join(ctx.applicationDir, 'yarn.lock'))
      await access(join(ctx.applicationDir, '.yarn/cache'))
    } catch {
      //return result
    }

    result.passed = true

    return result

    result.plans.push(new BuildPlan([new BuildPlanProvide('yarn-install')]))

    return result
  }
}
