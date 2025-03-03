import type { Layer }     from '../layers'

import { join }           from 'node:path'

import { Store }          from '../output'
import { LaunchMetadata } from '../output'
import { BuildMetadata }  from '../output'

export class BuildResult {
  constructor(
    public readonly layers: Array<Layer> = [],
    public readonly store: Store = new Store(),
    public readonly launchMetadata: LaunchMetadata = new LaunchMetadata(),
    public readonly buildMetadata: BuildMetadata = new BuildMetadata()
  ) {}

  async toPath(path: string): Promise<void> {
    for await (const layer of this.layers) {
      await layer.dump()
    }

    await this.store.toPath(join(path, 'store.toml'))
    await this.launchMetadata.toPath(join(path, 'launch.toml'))
    await this.buildMetadata.toPath(join(path, 'build.toml'))
  }
}
