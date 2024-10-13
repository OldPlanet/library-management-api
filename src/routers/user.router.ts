import { Router } from 'express'
import UserController from '../controllers/user.controller'

const userRouter = Router()

userRouter.post('/', UserController.createUser)
userRouter.get('/', UserController.getAllUsers)
userRouter.get('/:id', UserController.getUserById)

export default userRouter
