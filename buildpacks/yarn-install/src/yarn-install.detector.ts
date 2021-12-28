import fs                from 'fs'
import path              from 'path'

import { Detector }      from '@monstrs/buildpack-core'
import { DetectContext } from '@monstrs/buildpack-core'
import { DetectResult }  from '@monstrs/buildpack-core'

export class YarnInstallDetector implements Detector {
  async detect(ctx: DetectContext): Promise<DetectResult> {
    if (!fs.existsSync(path.join(ctx.workingDir, 'yarn.lock'))) {
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
