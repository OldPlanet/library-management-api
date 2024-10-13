import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../config/db.config'

interface BookEntry {
  name: string
  userScore?: number | null
}

interface UserBooks {
  past: BookEntry[]
  present: BookEntry[]
}

interface UserAttributes {
  id: number
  name: string
  books: UserBooks
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'books'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number
  public name!: string
  public books!: UserBooks
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    books: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {
        past: [],
        present: [],
      },
    },
  },
  {
    sequelize,
    modelName: 'User',
  }
)

export default User
