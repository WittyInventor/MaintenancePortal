// purpose for the model of how the data of how the tenant is unitnumber, phoneinfo
const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../config/connection");
// sequelize is a library for pre-written sql methods that help us write sql quicker so we don't have to write as much.

class Tenant extends Model {}

Tenant.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    unitnumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneinfo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    timestamps: false,
    // the table name stays the same(freeze) it cannot change using freeze table name
    underscored: true,
    // underscored: true - means the code will automatically convert to underscore if it is not already in underscored.
    modelName: "tenant",
  }
);

module.exports = Tenant;
