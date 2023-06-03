import { run }                        from '@monstrs/libcnb'

import { YarnWorkspaceStartBuilder }  from './yarn-workspace-start.builder.js'
import { YarnWorkspaceStartDetector } from './yarn-workspace-start.detector.js'

run(new YarnWorkspaceStartDetector(), new YarnWorkspaceStartBuilder())
