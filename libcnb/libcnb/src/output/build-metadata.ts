import { readFile }       from 'node:fs/promises'
import { writeFile }      from 'node:fs/promises'

import { stringify }      from '@iarna/toml'
import { parse }          from '@iarna/toml'

import { BOMEntry }       from './bom-entry'
import { UnmetPlanEntry } from './unmet-plan-entry'

export class BuildMetadata {
  constructor(
    public readonly bom: Array<BOMEntry> = [],
    public readonly unmet: Array<UnmetPlanEntry> = []
  ) {}

  static async fromPath(path: string): Promise<BuildMetadata> {
    const { bom = [], unmet = [] } = parse(await readFile(path, 'utf-8')) as {
      bom?: Array<BOMEntry>
      unmet?: Array<UnmetPlanEntry>
    }

    return new BuildMetadata(
      bom.map((bomEntry) => new BOMEntry(bomEntry.name, bomEntry.metadata)),
      unmet.map((unmetEntry) => new UnmetPlanEntry(unmetEntry.name))
    )
  }

  async toPath(path: string): Promise<void> {
    await writeFile(
      path,
      stringify({
        unmet: this.unmet.map((unmet) => ({ name: unmet.name })),
        bom: this.bom.map((bom) => ({
          name: bom.name,
          metadata: bom.metadata,
        })),
      })
    )
  }
}
