import { run }                        from '@monstrs/buildpack-core'

import { YarnWorkspaceBuildBuilder }  from './yarn-workspace-build.builder'
import { YarnWorkspaceBuildDetector } from './yarn-workspace-build.detector'

run(new YarnWorkspaceBuildDetector(), new YarnWorkspaceBuildBuilder())

// @ts-ignore
const core = require('@monstrs/buildpack-core') // eslint-disable-line
