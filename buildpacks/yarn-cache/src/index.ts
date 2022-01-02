import { run }               from '@monstrs/libcnb'

import { YarnCacheBuilder }  from './yarn-cache.builder'
import { YarnCacheDetector } from './yarn-cache.detector'

run(new YarnCacheDetector(), new YarnCacheBuilder())

// @ts-ignore
const core = require('@monstrs/libcnb') // eslint-disable-line
