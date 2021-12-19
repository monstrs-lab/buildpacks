import { run }                        from '@monstrs/buildpack-core'

import { YarnWorkspaceStartBuilder }  from './yarn-workspace-start.builder'
import { YarnWorkspaceStartDetector } from './yarn-workspace-start.detector'

run(new YarnWorkspaceStartDetector(), new YarnWorkspaceStartBuilder())

// @ts-ignore
const core = require('@monstrs/buildpack-core') // eslint-disable-line
