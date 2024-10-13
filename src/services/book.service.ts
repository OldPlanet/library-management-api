import APIError from '../errors/ApiError'
import AppError from '../errors/AppError'
import Book from '../models/book.model'
import { wrapError } from '../utils/errorUtils'

const createBook = async (name: string) => {
  try {
    if (!name) {
      throw new APIError(400, 'BOOK_NAME_REQUIRED', 'Book name is required.')
    }
    return await Book.create({ name })
  } catch (error) {
    throw new AppError('BOOK_CREATION_FAILED', 'Failed to create book.', wrapError(error))
  }
}

const getAllBooks = async () => {
  try {
    return await Book.findAll({
      attributes: ['id', 'name'],
    })
  } catch (error) {
    throw new AppError('FETCH_BOOKS_FAILED', 'Failed to fetch books.', wrapError(error))
  }
}

const getBookById = async (id: number) => {
  try {
    if (isNaN(id)) {
      throw new APIError(400, 'INVALID_BOOK_ID', 'Invalid book ID provided.')
    }
    const book = await Book.findByPk(id, {
      attributes: ['id', 'name', 'score'],
    })
    if (!book) {
      throw new APIError(404, 'BOOK_NOT_FOUND', `Book with ID ${id} not found.`)
    }
    return book
  } catch (error) {
    throw new AppError('FETCH_BOOK_FAILED', `Failed to fetch book with ID ${id}.`, wrapError(error))
  }
}

const BookService = {
  createBook,
  getAllBooks,
  getBookById,
}

export default BookService
