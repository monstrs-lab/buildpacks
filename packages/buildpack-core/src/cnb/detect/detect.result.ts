import { BuildPlan } from '../plan'

export class DetectResult {
  constructor(
    public readonly passed: boolean = false,
    public readonly plans: Array<BuildPlan> = []
  ) {}
}
