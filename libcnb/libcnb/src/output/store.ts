import { readFile }  from 'node:fs/promises'
import { writeFile } from 'node:fs/promises'
import { access }    from 'node:fs/promises'

import { stringify } from '@iarna/toml'
import { parse }     from '@iarna/toml'

export class Store {
  constructor(public readonly metadata: Record<string, any> = {}) {}

  static async fromPath(path): Promise<Store> {
    try {
      await access(path)

      const data = parse(await readFile(path, 'utf-8')) as { metadata: Record<string, any> }

      return new Store(data.metadata)
    } catch {
      return new Store()
    }
  }

  async toPath(path): Promise<void> {
    if (Object.keys(this.metadata).length > 0) {
      await writeFile(
        path,
        stringify({
          metadata: this.metadata,
        })
      )
    }
  }
}
