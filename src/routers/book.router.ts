import { Router } from 'express'
import BookController from '../controllers/book.controller'

const bookRouter = Router()

bookRouter.post('/', BookController.createBook)
bookRouter.get('/', BookController.getAllBooks)
bookRouter.get('/:id', BookController.getBookById)

export default bookRouter
