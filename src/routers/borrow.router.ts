import { Router } from 'express'
import BorrowController from '../controllers/borrow.controller'

const borrowRouter = Router()

borrowRouter.post('/users/:userId/borrow/:bookId', BorrowController.borrowBook)
borrowRouter.post('/users/:userId/return/:bookId', BorrowController.returnBook)

export default borrowRouter
