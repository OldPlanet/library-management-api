import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../config/db.config'

interface BookAttributes {
  id: number
  name: string
  available: boolean
  score: number
}

interface BookCreationAttributes extends Optional<BookAttributes, 'id' | 'available' | 'score'> {}

class Book extends Model<BookAttributes, BookCreationAttributes> implements BookAttributes {
  public id!: number
  public name!: string
  public available!: boolean
  public score!: number
}

Book.init(
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
    available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    score: {
      type: DataTypes.FLOAT,
      defaultValue: -1,
    },
  },
  {
    sequelize,
    modelName: 'Book',
  }
)

export default Book
