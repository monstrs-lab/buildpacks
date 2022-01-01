import execa                from 'execa'
import fs                   from 'fs'
import path                 from 'path'
import { readFileSync }     from 'fs'
import { join }             from 'path'

import { Detector }         from '@monstrs/buildpack-core'
import { DetectContext }    from '@monstrs/buildpack-core'
import { DetectResult }     from '@monstrs/buildpack-core'
import { BuildPlan }        from '@monstrs/buildpack-core'
import { BuildPlanProvide } from '@monstrs/buildpack-core'
import { BuildPlanRequire } from '@monstrs/buildpack-core'

export class YarnWorkspaceStartDetector implements Detector {
  async detect(ctx: DetectContext): Promise<DetectResult> {
    const result = new DetectResult()

    if (!process.env.WORKSPACE) {
      return result
    }

    if (!fs.existsSync(path.join(ctx.applicationDir, 'yarn.lock'))) {
      return result
    }

    const { stdout } = await execa('yarn', ['workspaces', 'list', '--json'])

    const workspaces = stdout.split('\n').map((item) => JSON.parse(item))

    const workspace = workspaces.find(({ name }) => name === process.env.WORKSPACE)

    if (!workspace) {
      return result
    }

    const entrypoint = `${workspace.location}/dist/index.js`

    const pkgjson = JSON.parse(readFileSync(join(workspace.location, 'package.json'), 'utf-8'))

    result.passed = true

    result.plans.push(new BuildPlan([new BuildPlanProvide('yarn-workspace-start')]))

    return result
  }
}
