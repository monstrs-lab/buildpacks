import { run }                        from '@monstrs/buildpack-core'

import { YarnWorkspaceServeBuilder }  from './yarn-workspace-serve.builder'
import { YarnWorkspaceServeDetector } from './yarn-workspace-serve.detector'

run(new YarnWorkspaceServeDetector(), new YarnWorkspaceServeBuilder())

// @ts-ignore
const core = require('@monstrs/buildpack-core') // eslint-disable-line
