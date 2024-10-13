import { Request, Response, NextFunction } from 'express'
import UserService from '../services/user.service'
import APIError from '../errors/ApiError'
import { wrapError } from '../utils/errorUtils'

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body
    if (!name) {
      throw new APIError(400, 'USER_NAME_REQUIRED', 'User name is required.')
    }
    await UserService.createUser(name)
    res.status(204).send()
  } catch (error) {
    next(wrapError(error))
  }
}

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await UserService.getAllUsers()
    if (!users.length) {
      throw new APIError(404, 'NO_USERS_FOUND', 'No users found in the system.')
    }
    res.status(200).json(users)
  } catch (error) {
    next(wrapError(error))
  }
}

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = Number(req.params.id)
    if (isNaN(userId)) {
      throw new APIError(400, 'INVALID_USER_ID', 'The user ID provided is not a valid number.')
    }
    const user = await UserService.getUserById(userId)
    if (!user) {
      throw new APIError(404, 'USER_NOT_FOUND', `No user found with ID ${userId}.`)
    }
    res.status(200).json(user)
  } catch (error) {
    next(wrapError(error))
  }
}

const UserController = {
  createUser,
  getAllUsers,
  getUserById,
}

export default UserController
