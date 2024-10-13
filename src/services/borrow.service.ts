import Borrow from '../models/borrow.model'
import Book from '../models/book.model'
import User from '../models/user.model'
import APIError from '../errors/ApiError'
import AppError from '../errors/AppError'
import { wrapError } from '../utils/errorUtils'
import sequelize from '../config/db.config'

const borrowBook = async (userId: number, bookId: number) => {
  try {
    const book = await Book.findByPk(bookId)
    if (!book) {
      throw new APIError(404, 'BOOK_NOT_FOUND', `Book with ID ${bookId} not found.`)
    }

    if (!book.available) {
      throw new APIError(400, 'BOOK_NOT_AVAILABLE', 'This book is currently not available for borrowing.')
    }

    const user = await User.findByPk(userId)
    if (!user) {
      throw new APIError(404, 'USER_NOT_FOUND', `User with ID ${userId} not found.`)
    }

    const borrow = await Borrow.create({ userId, bookId })
    await book.update({ available: false }, { where: { id: bookId } })

    const updatedBooks = {
      ...user.books,
      present: [...user.books.present, { name: book.name }],
    }
    await user.update({ books: updatedBooks })

    return borrow
  } catch (error) {
    throw new AppError('BORROW_BOOK_FAILED', 'Failed to borrow the book.', wrapError(error))
  }
}

const returnBook = async (userId: number, bookId: number, score: number) => {
  try {
    const borrow = await Borrow.findOne({ where: { userId, bookId, returned: false } })
    if (!borrow) {
      throw new APIError(400, 'BOOK_NOT_BORROWED', 'This book has not been borrowed by the user.')
    }

    const book = await Book.findByPk(bookId)
    if (!book) {
      throw new APIError(404, 'BOOK_NOT_FOUND', `Book with ID ${bookId} not found.`)
    }

    const user = await User.findByPk(userId)
    if (!user) {
      throw new APIError(404, 'USER_NOT_FOUND', `User with ID ${userId} not found.`)
    }

    await borrow.update({ returned: true, score })
    await book.update({ available: true, score }, { where: { id: bookId } })

    const updatedBooks = {
      past: [...user.books.past, { name: book.name, userScore: score }],
      present: user.books.present.filter((b) => b.name !== book.name),
    }
    await user.update({ books: updatedBooks })

    return borrow
  } catch (error) {
    throw new AppError('RETURN_BOOK_FAILED', 'Failed to return the book.', wrapError(error))
  }
}

const BorrowService = {
  borrowBook,
  returnBook,
}

export default BorrowService
