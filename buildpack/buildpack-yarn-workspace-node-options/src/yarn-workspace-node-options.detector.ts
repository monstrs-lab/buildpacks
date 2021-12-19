import fs                from 'fs'
import path              from 'path'

import { Detector }      from '@monstrs/buildpack-core'
import { DetectContext } from '@monstrs/buildpack-core'
import { DetectResult }  from '@monstrs/buildpack-core'

export class YarnWorkspaceNodeOptionsDetector implements Detector {
  async detect(ctx: DetectContext): Promise<DetectResult> {
    const pnppath = path.join(ctx.workingDir, '.pnp.cjs')

    const nodeOptions: Array<string> = []

    if (fs.existsSync(pnppath)) {
      nodeOptions.push('--require')
      nodeOptions.push(pnppath)
    }

    if (nodeOptions.length === 0) {
      return null
    }

    return {
      provides: [
        {
          name: 'yarn-workspace-node-options',
        },
      ],
      requires: [
        {
          name: 'yarn-workspace-node-options',
          metadata: {
            nodeOptions: nodeOptions.join(' '),
          },
        },
      ],
    }
  }
}
