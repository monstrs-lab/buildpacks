import type { Builder }      from '@monstrs/libcnb'
import type { BuildContext } from '@monstrs/libcnb'

import { readFile }          from 'node:fs/promises'
import { rename }            from 'node:fs/promises'
import { link }              from 'node:fs/promises'
import { join }              from 'node:path'

import { createHash }        from 'crypto'

import { BuildResult }       from '@monstrs/libcnb'

export class YarnCacheBuilder implements Builder {
  async build(ctx: BuildContext): Promise<BuildResult> {
    const yarnCachePath = join(ctx.applicationDir, '.yarn/packages')

    const yarnLock = await readFile(join(ctx.applicationDir, 'yarn.lock'), 'utf8')
    const yarnLockCheckSum = createHash('md5').update(yarnLock).digest('hex')

    const cacheLayer = await ctx.layers.get('yarn-cache', true, true, true)

    if (yarnLockCheckSum !== cacheLayer.getMetadata('locksum')) {
      await rename(yarnCachePath, cacheLayer.path)
      await link(cacheLayer.path, yarnCachePath)

      cacheLayer.setMetadata('locksum', yarnLockCheckSum.toString())
    }

    return new BuildResult([cacheLayer])
  }
}
