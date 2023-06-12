import type { JsonMap }       from '@iarna/toml'

import { readFile }           from 'node:fs/promises'

import { parse }              from '@iarna/toml'

import { BuildpackPlanEntry } from './buildpack.plan-entry'

export class BuildpackPlan {
  constructor(public readonly entries: Array<BuildpackPlanEntry> = []) {}

  static async fromPath(path: string): Promise<BuildpackPlan> {
    const { entries = [] }: JsonMap = parse(await readFile(path, 'utf-8'))

    if (Array.isArray(entries)) {
      return new BuildpackPlan(
        entries.map((entry) => new BuildpackPlanEntry(entry.name, entry.metadata))
      )
    }

    return new BuildpackPlan([])
  }
}
