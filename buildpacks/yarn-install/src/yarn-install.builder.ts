import execa            from 'execa'
import { xfs }          from '@yarnpkg/fslib'
import { ppath }        from '@yarnpkg/fslib'
import { PortablePath } from '@yarnpkg/fslib'

import { Builder }      from '@monstrs/buildpack-core'
import { BuildContext } from '@monstrs/buildpack-core'
import { BuildResult }  from '@monstrs/buildpack-core'

export class YarnInstallBuilder implements Builder {
  async build(ctx: BuildContext): Promise<BuildResult> {
    await execa('yarn', ['install', '--immutable', '--immutable-cache', '--inline-builds'], {
      stdin: 'inherit',
    })

    return new BuildResult()
  }
}
