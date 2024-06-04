import { readFile }  from 'node:fs/promises'
import { writeFile } from 'node:fs/promises'

import { stringify } from '@iarna/toml'
import { parse }     from '@iarna/toml'

import { BOMEntry }  from './bom-entry'
import { Label }     from './label'
import { Process }   from './process'
import { Slice }     from './slice'

export class LaunchMetadata {
  constructor(
    public readonly labels: Array<Label> = [],
    public readonly processes: Array<Process> = [],
    public readonly slices: Array<Slice> = [],
    public readonly bom: Array<BOMEntry> = []
  ) {}

  static async fromPath(path: string): Promise<LaunchMetadata> {
    const {
      labels = [],
      processes = [],
      slices = [],
      bom = [],
    } = parse(await readFile(path, 'utf-8')) as {
      labels?: Array<Label>
      processes?: Array<Process>
      slices?: Array<Slice>
      bom?: Array<BOMEntry>
    }

    return new LaunchMetadata(
      labels.map((label) => new Label(label.key, label.value)),
      processes.map((processe) => new Process(processe.type, processe.command, processe.args)),
      slices.map((slice) => new Slice(slice.paths)),
      bom.map((bomEntry) => new BOMEntry(bomEntry.name, bomEntry.metadata))
    )
  }

  async toPath(path: string): Promise<void> {
    await writeFile(
      path,
      stringify({
        labels: this.labels.map((label) => ({
          key: label.key,
          value: label.value,
        })),
        processes: this.processes.map((process) => ({
          type: process.type,
          command: process.command,
          args: process.args,
          default: process.default,
        })),
        slices: this.slices.map((slice) => ({ paths: slice.paths })),
        bom: this.bom.map((bom) => ({
          name: bom.name,
          metadata: bom.metadata,
        })),
      })
    )
  }
}
