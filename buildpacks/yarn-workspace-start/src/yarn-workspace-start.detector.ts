import execa             from 'execa'
import fs                from 'fs'
import path              from 'path'
import { readFileSync }  from 'fs'
import { join }          from 'path'

import { Detector }      from '@monstrs/buildpack-core'
import { DetectContext } from '@monstrs/buildpack-core'
import { DetectResult }  from '@monstrs/buildpack-core'

export class YarnWorkspaceStartDetector implements Detector {
  async detect(ctx: DetectContext): Promise<DetectResult> {
    if (!process.env.WORKSPACE) {
      return null
    }

    if (!fs.existsSync(path.join(ctx.workingDir, 'yarn.lock'))) {
      return null
    }

    const { stdout } = await execa('yarn', ['workspaces', 'list', '--json'])

    const workspaces = stdout.split('\n').map((item) => JSON.parse(item))

    const workspace = workspaces.find(({ name }) => name === process.env.WORKSPACE)

    if (!workspace) {
      return null
    }

    const entrypoint = `${workspace.location}/dist/index.js`

    const pkgjson = JSON.parse(readFileSync(join(workspace.location, 'package.json'), 'utf-8'))

    return {
      provides: [
        {
          name: 'yarn-workspace-start',
        },
      ],
      requires: [
        {
          name: 'yarn-workspace-start',
          metadata: {
            entrypoint,
            location: workspace.location,
            command: pkgjson.scripts?.start || 'node dist/index.js',
          },
        },
      ],
    }
  }
}
