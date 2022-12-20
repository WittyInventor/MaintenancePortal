const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/connection');
// sequelize is a library for pre-written sql methods that help us write sql quicker so we don't have to write as much.

class WorkOrder extends Model {}

WorkOrder.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    ordernumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM('Open', 'In Progress', 'Completed'),
      allowNull: false,
      defaultValue: 'Open',
    },
    levelofurgency: {
      type: Sequelize.ENUM('Low', 'Medium', 'High'),
      allowNull: false,
      defaultValue: 'Low',
    },
    assignedto: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    invoice: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    invoiceamount: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    request_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'request',
        key: 'id',
      },
    },
    propertymanager_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'propertymanager',
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
    modelName: 'workorder',
  }
);

module.exports = WorkOrder;
