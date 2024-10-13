import { Request, Response, NextFunction } from 'express'
import BookService from '../services/book.service'
import APIError from '../errors/ApiError'
import { wrapError } from '../utils/errorUtils'

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body
    if (!name) {
      throw new APIError(400, 'BOOK_NAME_REQUIRED', 'Book name is required.')
    }
    await BookService.createBook(name)
    res.status(204).send()
  } catch (error) {
    next(wrapError(error))
  }
}

const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const books = await BookService.getAllBooks()
    if (!books.length) {
      throw new APIError(404, 'NO_BOOKS_FOUND', 'No books available in the library.')
    }
    res.status(200).json(books)
  } catch (error) {
    next(wrapError(error))
  }
}

const getBookById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookId = Number(req.params.id)
    if (isNaN(bookId)) {
      throw new APIError(400, 'INVALID_BOOK_ID', 'The book ID provided is not a valid number.')
    }
    const book = await BookService.getBookById(bookId)
    if (!book) {
      throw new APIError(404, 'BOOK_NOT_FOUND', `No book found with ID ${bookId}.`)
    }
    res.status(200).json(book)
  } catch (error) {
    next(wrapError(error))
  }
}

const BookController = {
  createBook,
  getAllBooks,
  getBookById,
}

export default BookController
