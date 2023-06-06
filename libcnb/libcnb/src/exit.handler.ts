export class ExitHandler {
  static ErrorStatusCode = 1

  static FailStatusCode = 100

  static PassStatusCode = 0

  static pass(): void {
    // eslint-disable-next-line n/no-process-exit
    process.exit(ExitHandler.PassStatusCode)
  }

  static fail(): void {
    // eslint-disable-next-line n/no-process-exit
    process.exit(ExitHandler.FailStatusCode)
  }

  static error(error): void {
    // eslint-disable-next-line no-console
    console.error(error)

    // eslint-disable-next-line n/no-process-exit
    process.exit(ExitHandler.ErrorStatusCode)
  }
}
