import execa           from 'execa'

import { Builder }     from '@monstrs/libcnb'
import { BuildResult } from '@monstrs/libcnb'

export class YarnInstallBuilder implements Builder {
  async build(): Promise<BuildResult> {
    await execa('yarn', ['install', '--immutable', '--inline-builds'], {
      stdin: 'inherit',
    })

    return new BuildResult()
  }
}
