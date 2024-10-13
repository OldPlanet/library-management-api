import BaseError from './BaseError'

export default class APIError extends BaseError {
  constructor(status: number, code: string, desc: string) {
    super('APIError', status, true, code, desc)
  }
}
