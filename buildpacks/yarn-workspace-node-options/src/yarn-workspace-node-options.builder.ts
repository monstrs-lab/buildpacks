import { PortablePath } from '@yarnpkg/fslib'
import { execUtils }    from '@yarnpkg/core'
import { xfs }          from '@yarnpkg/fslib'
import { ppath }        from '@yarnpkg/fslib'

import { Builder }      from '@monstrs/buildpack-core'
import { BuildContext } from '@monstrs/buildpack-core'
import { BuildResult }  from '@monstrs/buildpack-core'

export class YarnWorkspaceNodeOptionsBuilder implements Builder {
  async build(ctx: BuildContext): Promise<BuildResult> {
    const entry = ctx.plan.getEntry('yarn-workspace-node-options')

    const { nodeOptions }: { nodeOptions?: string } = entry?.metadata || {}

    if (nodeOptions) {
      ctx.addLaunchEnv('NODE_OPTIONS', nodeOptions)
    }

    const layer = ctx.layers.get('node-options', true, true, true)

    //await xfs.mkdirPromise(ppath.join(layer.path as PortablePath, 'env' as PortablePath))
    //if (!(await xfs.existsPromise(ppath.join(layer.path as PortablePath, 'env.launch' as PortablePath)))) {
    //  await xfs.mkdirPromise(ppath.join(layer.path as PortablePath, 'env.launch' as PortablePath))
    //}

    //await xfs.writeFilePromise(ppath.join(layer.path as PortablePath, 'env/NODE_OPTIONS' as PortablePath), nodeOptions)
    //await xfs.writeFilePromise(ppath.join(layer.path as PortablePath, 'env/PWD' as PortablePath), '/workspace/operators/preview-operator')
    //await xfs.writeFilePromise(ppath.join(layer.path as PortablePath, 'env.launch/NODE_OPTIONS' as PortablePath), nodeOptions)
  }
}
