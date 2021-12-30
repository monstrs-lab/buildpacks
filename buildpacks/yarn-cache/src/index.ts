import { run }                       from '@monstrs/buildpack-core'

import { YarnCacheBuilder }  from './yarn-cache.builder'
import { YarnCacheDetector } from './yarn-cache.detector'

run(new YarnCacheDetector(), new YarnCacheBuilder())

// @ts-ignore
const core = require('@monstrs/buildpack-core') // eslint-disable-line
