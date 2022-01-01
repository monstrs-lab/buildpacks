export class Process {
  constructor(
    public readonly type: 'web' | 'worker',
    public readonly command: string,
    public readonly args: Array<string>,
    public readonly direct: boolean = false
  ) {}
}
