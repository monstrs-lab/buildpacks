import { run }                       from '@monstrs/buildpack-core'

import { YarnWorkspacePackBuilder }  from './yarn-workspace-pack.builder'
import { YarnWorkspacePackDetector } from './yarn-workspace-pack.detector'

run(new YarnWorkspacePackDetector(), new YarnWorkspacePackBuilder())

// @ts-ignore
const core = require('@monstrs/buildpack-core') // eslint-disable-line
