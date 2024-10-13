import { Request, Response, NextFunction } from 'express'
import { errorFilter } from '../utils/errorUtils'

export const globalErrorHandler = (err: Error, _: Request, res: Response, __: NextFunction) => {
  console.error('ERROR 💥 ', err)

  const { code, status, message, timestamp } = errorFilter(err)

  res.status(status).json({
    code,
    message,
    timestamp,
  })
}
