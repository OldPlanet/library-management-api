import { Request, Response, NextFunction } from 'express'
import BorrowService from '../services/borrow.service'
import APIError from '../errors/ApiError'
import { wrapError } from '../utils/errorUtils'

const borrowBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = Number(req.params.userId)
    const bookId = Number(req.params.bookId)
    if (isNaN(userId)) {
      throw new APIError(400, 'INVALID_USER_ID', 'The user ID provided is not a valid number.')
    }
    if (isNaN(bookId)) {
      throw new APIError(400, 'INVALID_BOOK_ID', 'The book ID provided is not a valid number.')
    }
    await BorrowService.borrowBook(userId, bookId)
    res.status(204).send()
  } catch (error) {
    next(wrapError(error))
  }
}

const returnBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = Number(req.params.userId)
    const bookId = Number(req.params.bookId)
    const { score } = req.body
    if (isNaN(userId)) {
      throw new APIError(400, 'INVALID_USER_ID', 'The user ID provided is not a valid number.')
    }
    if (isNaN(bookId)) {
      throw new APIError(400, 'INVALID_BOOK_ID', 'The book ID provided is not a valid number.')
    }
    if (score === undefined || score < 0 || score > 10) {
      throw new APIError(400, 'INVALID_SCORE', 'The score must be a number between 0 and 10.')
    }
    await BorrowService.returnBook(userId, bookId, score)
    res.status(204).send()
  } catch (error) {
    next(wrapError(error))
  }
}

const BorrowController = {
  borrowBook,
  returnBook,
}

export default BorrowController
