import { PortablePath } from '@yarnpkg/fslib'
import { execUtils }    from '@yarnpkg/core'
import { xfs }          from '@yarnpkg/fslib'
import { ppath }        from '@yarnpkg/fslib'

import YAML             from 'yaml'
import { createHash }   from 'crypto'

import { Builder }      from '@monstrs/buildpack-core'
import { BuildContext } from '@monstrs/buildpack-core'
import { BuildResult }  from '@monstrs/buildpack-core'

export class YarnCacheBuilder implements Builder {
  async build(ctx: BuildContext): Promise<BuildResult> {
      const workingDir = ctx.workingDir as PortablePath

      const yarnLock = await xfs.readFilePromise(ppath.join(workingDir, 'yarn.lock' as PortablePath))
      const yarnLockCheckSum = createHash('md5').update(yarnLock).digest('hex')

      const yarnCachePath = ppath.join(workingDir, '.yarn/cache' as PortablePath)

      if (xfs.existsSync(yarnCachePath)) {
        const cacheLayer = await ctx.layers.get('yarn-cache', true, true, true)

        if (yarnLockCheckSum !== cacheLayer.getMetadata('locksum')) {
          for await (const file of await xfs.readdirPromise(yarnCachePath)) {
            await xfs.copyPromise(
              ppath.join(cacheLayer.path as PortablePath, file),
              ppath.join(yarnCachePath, file)
            )
          }

          cacheLayer.setMetadata('locksum', yarnLockCheckSum.toString())
          //cacheLayer.save()
        }

        await xfs.rmdirPromise(yarnCachePath, { recursive: true })

        const yarnrc = await xfs.readFilePromise(ppath.join(workingDir, '.yarnrc.yml' as PortablePath))

        const yarnrcContent = YAML.parse(yarnrc.toString())

        await xfs.writeFilePromise(
          ppath.join(workingDir, '.yarnrc.yml' as PortablePath),
          YAML.stringify({
            ...yarnrcContent,
            cacheFolder: ppath.relative(workingDir, cacheLayer.path as PortablePath),
          })
        )
      }

      await execUtils.pipevp('yarn', ['install', '--immutable'], {
        cwd: workingDir,
        stdin: process.stdin,
        stdout: process.stdout,
        stderr: process.stderr,
        env: process.env,
      })
  }
}