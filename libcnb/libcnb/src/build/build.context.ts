import type { Buildpack }     from '../buildpack'
import type { Layers }        from '../layers'
import type { Store }         from '../output'
import type { BuildpackPlan } from '../plan'
import type { Platform }      from '../platform'

export class BuildContext {
  constructor(
    public readonly applicationDir: string,
    public readonly buildpack: Buildpack,
    public readonly layers: Layers,
    public readonly store: Store,
    public readonly plan: BuildpackPlan,
    public readonly platform: Platform,
    public readonly stackId: string
  ) {}
}
