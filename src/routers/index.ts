import { Router } from 'express'
import userRouter from './user.router'
import bookRouter from './book.router'
import borrowRouter from './borrow.router'

const router = Router()

router.use('/users', userRouter)
router.use('/books', bookRouter)
router.use('/', borrowRouter)

export default router
