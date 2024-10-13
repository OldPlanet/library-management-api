export default class BaseError extends Error {
  public readonly success: boolean
  public readonly timestamp: number

  constructor(
    public readonly name: string,
    public readonly status: number,
    public readonly isOperational: boolean,
    public readonly code: string,
    public readonly message: string
  ) {
    super(message)

    Object.setPrototypeOf(this, new.target.prototype)
    this.success = false
    this.timestamp = Date.now()

    Error.captureStackTrace(this)
  }
}
