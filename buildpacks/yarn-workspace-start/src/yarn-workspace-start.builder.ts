import { readFileSync } from 'node:fs'
import { writeFile }    from 'node:fs/promises'
import { chmod }        from 'node:fs/promises'
import { join }         from 'node:path'

import { Builder }      from '@monstrs/libcnb'
import { BuildContext } from '@monstrs/libcnb'
import { BuildResult }  from '@monstrs/libcnb'
import { Process }      from '@monstrs/libcnb'

export class YarnWorkspaceStartBuilder implements Builder {
  async build(ctx: BuildContext): Promise<BuildResult> {
    const pkgjson = JSON.parse(readFileSync(join(ctx.applicationDir, 'package.json'), 'utf-8'))

    const command = pkgjson.scripts.start

    await writeFile('/workspace/run.sh', `#!/usr/bin/env bash\n${command}`)
    await chmod('/workspace/run.sh', '755')

    const nodeOptionsLayer = await ctx.layers.get('node-options', true, true, true)

    nodeOptionsLayer.launchEnv.append(
      'NODE_OPTIONS',
      [
        '--require',
        join(ctx.applicationDir, '.pnp.cjs'),
        '--loader',
        join(ctx.applicationDir, '.pnp.loader.mjs'),
      ].join(' '),
      ' '
    )

    const result = new BuildResult()

    result.launchMetadata.processes.push(new Process('web', './run.sh', [], true, true))
    result.layers.push(nodeOptionsLayer)

    return result
  }
}
