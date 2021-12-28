import { BuildpackPlan }     from './buildpack.plan'
import { EnvironmentWriter } from './environment.writter'
import { Launch }            from './launch'
import { Layers }            from './layers'

export class BuildContext {
  launch = new Launch()

  sharedEnv = new EnvironmentWriter('env')

  launchEnv = new EnvironmentWriter('env.launch')

  buildEnv = new EnvironmentWriter('env.build')

  constructor(
    readonly workingDir: string,
    readonly buildpackPath: string,
    readonly layers: Layers,
    readonly plan: BuildpackPlan
  ) {}

  addWebProcess(command: string[]) {
    this.launch.addWebProcess(command)
  }

  addSharedEnv(key: string, value: string) {
    this.sharedEnv.add(key, value)
  }

  addLaunchEnv(key: string, value: string) {
    this.launchEnv.add(key, value)
  }

  addBuildEnv(key: string, value: string) {
    this.buildEnv.add(key, value)
  }
}
