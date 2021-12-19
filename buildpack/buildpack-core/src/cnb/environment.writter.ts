import { existsSync }    from 'fs'
import { writeFileSync } from 'fs'
import { mkdirSync }     from 'fs'
import { join }          from 'path'

export class EnvironmentWriter {
  private readonly values: Map<string, string> = new Map()

  constructor(private readonly platform: 'env' | 'env.launch' | 'env.build') {}

  add(key: string, value: string) {
    this.values.set(key, value)
  }

  save(layersPath: string) {
    if (!existsSync(join(layersPath, this.platform))) {
      mkdirSync(join(layersPath, this.platform))
    }

    this.values.forEach((value, key) => {
      writeFileSync(join(layersPath, this.platform, key), value)
    })
  }
}
