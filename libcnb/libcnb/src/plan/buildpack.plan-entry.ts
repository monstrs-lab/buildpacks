export class BuildpackPlanEntry {
  constructor(
    public readonly name: string,
    public readonly metadata: Record<string, any>
  ) {}
}
