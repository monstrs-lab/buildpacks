import { run }               from '@monstrs/libcnb'

import { YarnCacheBuilder }  from './yarn-cache.builder.js'
import { YarnCacheDetector } from './yarn-cache.detector.js'

run(new YarnCacheDetector(), new YarnCacheBuilder())
