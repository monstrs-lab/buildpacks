import type { BuildPlanProvide } from './build-plan.provide'
import type { BuildPlanRequire } from './build-plan.require'

export class BuildPlan {
  constructor(
    public readonly provides: Array<BuildPlanProvide> = [],
    public readonly requires: Array<BuildPlanRequire> = []
  ) {}
}
