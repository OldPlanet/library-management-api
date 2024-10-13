import APIError from '../errors/ApiError'
import BaseError from '../errors/BaseError'

export const isTrustedError = (err: Error) => {
  if (err instanceof BaseError) return err.isOperational
  return false
}

export const errorFilter = (err: Error) => {
  if (err instanceof BaseError && isTrustedError(err)) return err
  return new APIError(500, 'ERR_INTERNAL_SERVER', 'Something went wrong internaly')
}

export const wrapError = (err: unknown): Error => {
  if (err instanceof Error) return err
  return new Error(typeof err === 'string' ? err : 'An unexpected error occurred')
}
