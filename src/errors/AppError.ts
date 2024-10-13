import BaseError from './BaseError'

export default class AppError extends BaseError {
  public readonly stackTrace: string | undefined

  constructor(code: string, desc: string, err: Error) {
    super('AppError', 500, false, code, err.message)
    this.stackTrace = err.stack
  }
}
