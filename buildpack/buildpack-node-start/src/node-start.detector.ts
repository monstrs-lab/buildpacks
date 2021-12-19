import { Detector }      from '@monstrs/buildpack-core'
import { DetectContext } from '@monstrs/buildpack-core'
import { DetectResult }  from '@monstrs/buildpack-core'

export class NodeStartDetector implements Detector {
  async detect(ctx: DetectContext): Promise<DetectResult> {
    return {
      provides: [
        {
          name: 'node-start',
        },
      ],
      requires: [],
    }
  }
}
