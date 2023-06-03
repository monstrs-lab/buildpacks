import type { DetectContext } from './detect.context'
import type { DetectResult }  from './detect.result'

export interface Detector {
  detect: (context: DetectContext) => Promise<DetectResult>
}
