import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../config/db.config'
import User from './user.model'
import Book from './book.model'

interface BorrowAttributes {
  id: number
  userId: number
  bookId: number
  returned: boolean
  score: number | null
}

interface BorrowCreationAttributes extends Optional<BorrowAttributes, 'id' | 'returned' | 'score'> {}

class Borrow extends Model<BorrowAttributes, BorrowCreationAttributes> implements BorrowAttributes {
  public id!: number
  public userId!: number
  public bookId!: number
  public returned!: boolean
  public score!: number | null
}

Borrow.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
    },
    bookId: {
      type: DataTypes.INTEGER,
      references: {
        model: Book,
        key: 'id',
      },
    },
    returned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Borrow',
  }
)

User.hasMany(Borrow, { foreignKey: 'userId' })
Book.hasMany(Borrow, { foreignKey: 'bookId' })

export default Borrow
