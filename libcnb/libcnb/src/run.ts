import type { Builder }  from './build'
import type { Detector } from './detect'

import path              from 'path'

import { ExitHandler }   from './exit.handler'
import { build }         from './build'
import { detect }        from './detect'

export const run = async (detector: Detector, builder?: Builder): Promise<void> => {
  const phase = path.basename(process.argv[1])

  if (!['detect', 'build'].includes(phase)) {
    ExitHandler.error(new Error(`Unsupported phase ${phase}`))
  }

  try {
    if (phase === 'detect') {
      await detect(detector)
    } else if (phase === 'build') {
      if (builder) {
        await build(builder)
      }
    }
  } catch (error) {
    ExitHandler.error(error)
  }
}
