import { run }                              from '@monstrs/buildpack-core'

import { YarnWorkspaceNodeOptionsBuilder }  from './yarn-workspace-node-options.builder'
import { YarnWorkspaceNodeOptionsDetector } from './yarn-workspace-node-options.detector'

run(new YarnWorkspaceNodeOptionsDetector(), new YarnWorkspaceNodeOptionsBuilder())

// @ts-ignore
const core = require('@monstrs/buildpack-core') // eslint-disable-line
