import path            from 'path'

import { ExitHandler } from './cnb'
import { Builder }     from './cnb/build'
import { Detector }    from './cnb/detect'
import { build }       from './cnb/build'
import { detect }      from './cnb/detect'

export const run = async (detector: Detector, builder?: Builder) => {
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
