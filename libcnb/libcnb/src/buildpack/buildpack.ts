import type { JsonMap }        from '@iarna/toml'

import { readFile }            from 'node:fs/promises'
import { join }                from 'node:path'

import { parse }               from '@iarna/toml'

import { BuildpackGroupEntry } from './buildpack.group-entry'
import { BuildpackInfo }       from './buildpack.info'
import { BuildpackLicense }    from './buildpack.license'
import { BuildpackOrder }      from './buildpack.order'
import { BuildpackStack }      from './buildpack.stack'

export class Buildpack {
  constructor(
    public readonly api: string,
    public readonly info: BuildpackInfo,
    public readonly path: string,
    public readonly stacks: Array<BuildpackStack> = [],
    public readonly metadata: Record<string, any> = {},
    public readonly order: Array<BuildpackOrder> = []
  ) {}

  static buildInfo(buildpack: JsonMap = {}): BuildpackInfo {
    return new BuildpackInfo(
      buildpack.id as string,
      buildpack.version as string,
      buildpack.name as string,
      buildpack.homepage as string,
      buildpack['clear-env'] as boolean,
      buildpack.description as string,
      buildpack.keywords as Array<string>,
      ((buildpack.licenses as Array<JsonMap>) || []).map(
        (license) => new BuildpackLicense(license.type as string, license.uri as string)
      )
    )
  }

  static async fromPath(path: string): Promise<Buildpack> {
    const {
      api,
      buildpack,
      stacks = [],
      metadata,
      order = [],
    }: JsonMap = parse(await readFile(join(path, 'buildpack.toml'), 'utf-8'))

    return new Buildpack(
      api as string,
      this.buildInfo(buildpack as JsonMap),
      path,
      (stacks as Array<JsonMap>).map(
        (stack) => new BuildpackStack(stack.id as string, stack.mixins as Array<string>)
      ),
      metadata as JsonMap,
      (order as Array<JsonMap>).map(
        ({ group: groups = [] }) =>
          new BuildpackOrder(
            (groups as Array<JsonMap>).map(
              (group: JsonMap) =>
                new BuildpackGroupEntry(
                  group.id as string,
                  group.version as string,
                  group.optional as boolean
                )
            )
          )
      )
    )
  }
}
