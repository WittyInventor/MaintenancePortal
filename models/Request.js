const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/connection');
// sequelize is a library for pre-written sql methods that help us write sql quicker so we don't have to write as much.

class Request extends Model {}

Request.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    categorymaintenance: {
        type: Sequelize.ENUM('Appliance', 'Electrical','Doors and Locks','Flooring','Plumbing', 'HVAC', 'Other'),
        defaultValue: 'Other',
        allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    permissiontoenter: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    alarmcode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    entrynotes: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tenant_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tenant',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    // the table name stays the same(freeze) it cannot change using freeze table name
    underscored: true,
    // underscored: true - means the code will automatically convert to underscore if it is not already in underscored.
    modelName: 'request',
  }
);

module.exports = Request;
