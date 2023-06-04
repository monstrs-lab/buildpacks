import type { Builder }      from '@monstrs/libcnb'
import type { BuildContext } from '@monstrs/libcnb'

import { join }              from 'node:path'

import { BuildResult }       from '@monstrs/libcnb'
import { Process }           from '@monstrs/libcnb'

export class YarnWorkspaceStartBuilder implements Builder {
  async build(ctx: BuildContext): Promise<BuildResult> {
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

    result.launchMetadata.processes.push(new Process('web', 'node', ['dist/index.js'], true, true))
    result.layers.push(nodeOptionsLayer)

    return result
  }
}
