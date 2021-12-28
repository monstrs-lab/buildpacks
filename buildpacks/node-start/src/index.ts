import { run }               from '@monstrs/buildpack-core'

import { NodeStartBuilder }  from './node-start.builder'
import { NodeStartDetector } from './node-start.detector'

run(new NodeStartDetector(), new NodeStartBuilder())

// @ts-ignore
const core = require('@monstrs/buildpack-core') // eslint-disable-line
