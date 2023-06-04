import type { Builder } from '@monstrs/libcnb'

import { execa }        from 'execa'

import { BuildResult }  from '@monstrs/libcnb'

export class YarnInstallBuilder implements Builder {
  async build(): Promise<BuildResult> {
    await execa('yarn', ['install', '--immutable', '--inline-builds'], {
      stdin: 'inherit',
    })

    return new BuildResult()
  }
}
