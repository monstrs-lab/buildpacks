import type { BuildContext } from './build.context'
import type { BuildResult }  from './build.result'

export interface Builder {
  build: (context: BuildContext) => Promise<BuildResult>
}
