import User from '../models/user.model'
import APIError from '../errors/ApiError'
import AppError from '../errors/AppError'
import { wrapError } from '../utils/errorUtils'

const createUser = async (name: string) => {
  try {
    if (!name) {
      throw new APIError(400, 'USER_NAME_REQUIRED', 'User name is required.')
    }
    return await User.create({ name })
  } catch (error) {
    throw new AppError('USER_CREATION_FAILED', 'Failed to create user.', wrapError(error))
  }
}

const getAllUsers = async () => {
  try {
    return await User.findAll({
      attributes: ['id', 'name'],
    })
  } catch (error) {
    throw new AppError('FETCH_USERS_FAILED', 'Failed to fetch users.', wrapError(error))
  }
}

const getUserById = async (id: number) => {
  try {
    if (isNaN(id)) {
      throw new APIError(400, 'INVALID_USER_ID', 'Invalid user ID provided.')
    }
    const user = await User.findByPk(id)
    if (!user) {
      throw new APIError(404, 'USER_NOT_FOUND', `User with ID ${id} not found.`)
    }
    return user
  } catch (error) {
    throw new AppError('FETCH_USER_FAILED', `Failed to fetch user with ID ${id}.`, wrapError(error))
  }
}

const UserService = {
  createUser,
  getAllUsers,
  getUserById,
}

export default UserService
