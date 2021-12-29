import { writeFileSync } from 'fs'
import { chmodSync } from 'fs'

import { Builder }      from '@monstrs/buildpack-core'
import { BuildContext } from '@monstrs/buildpack-core'
import { BuildResult }  from '@monstrs/buildpack-core'

export class YarnWorkspaceStartBuilder implements Builder {
  async build(ctx: BuildContext): Promise<BuildResult> {
    const entry = ctx.plan.getEntry('yarn-workspace-start')

    const location = entry?.metadata?.location || '/workspace'
    const command = entry?.metadata.command

    writeFileSync('/workspace/run.sh', `#!/usr/bin/env bash\ncd ${location} && ${command}`)
    chmodSync('/workspace/run.sh', '755')

    ctx.addWebProcess(['./run.sh'])
  }
}
