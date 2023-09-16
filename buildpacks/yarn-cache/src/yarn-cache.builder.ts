import type { Builder }      from '@monstrs/libcnb'
import type { BuildContext } from '@monstrs/libcnb'

import { readFile }          from 'node:fs/promises'
import { readdir }           from 'node:fs/promises'
import { copyFile }          from 'node:fs/promises'
import { rmdir }             from 'node:fs/promises'
import { writeFile }         from 'node:fs/promises'
import { join }              from 'node:path'
import { relative }          from 'node:path'

import { createHash }        from 'crypto'
import { execa }             from 'execa'
import YAML                  from 'yaml'

import { BuildResult }       from '@monstrs/libcnb'

export class YarnCacheBuilder implements Builder {
  async build(ctx: BuildContext): Promise<BuildResult> {
    const yarnCachePath = join(ctx.applicationDir, '.yarn/cache')

    const yarnLock = await readFile(join(ctx.applicationDir, 'yarn.lock'), 'utf8')
    const yarnLockCheckSum = createHash('md5').update(yarnLock).digest('hex')

    const cacheLayer = await ctx.layers.get('yarn-cache', true, true, true)

    if (yarnLockCheckSum !== cacheLayer.getMetadata('locksum')) {
      for await (const file of await readdir(yarnCachePath)) {
        await copyFile(join(cacheLayer.path, file), join(yarnCachePath, file))
      }

      cacheLayer.setMetadata('locksum', yarnLockCheckSum.toString())
    }

    await rmdir(yarnCachePath, { recursive: true })

    const yarnrc = await readFile(join(ctx.applicationDir, '.yarnrc.yml'))

    const yarnrcContent = YAML.parse(yarnrc.toString())

    await writeFile(
      join(ctx.applicationDir, '.yarnrc.yml'),
      YAML.stringify({
        ...yarnrcContent,
        cacheFolder: relative(ctx.applicationDir, cacheLayer.path),
      })
    )

    await execa('yarn', ['install', '--immutable'], {
      cwd: ctx.applicationDir,
      stdin: process.stdin,
      stdout: process.stdout,
      stderr: process.stderr,
      env: process.env,
    })

    return new BuildResult([cacheLayer])
  }
}
