import execa            from 'execa'

import { Builder }      from '@monstrs/buildpack-core'
import { BuildContext } from '@monstrs/buildpack-core'
import { BuildResult }  from '@monstrs/buildpack-core'

export class YarnWorkspaceBuildBuilder implements Builder {
  async build(ctx: BuildContext): Promise<BuildResult> {
    const entry = ctx.plan.getEntry('yarn-workspace-build')

    if (entry) {
      const { workspace } = entry.metadata

      await execa('yarn', ['workspace', workspace, 'build'], {
        stdio: 'inherit',
      })
    }
  }
}
