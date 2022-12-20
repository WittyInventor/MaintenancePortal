const sequelize = require('../config/connection');
const PropertyManager  = require('../models/PropertyManager');

const propertymanagerdata = [
  {
    user_id: 4,
    phoneinfo: '100-456-7890'
  },
];

const seedPropertyManager = () => PropertyManager.bulkCreate(propertymanagerdata, {individualHooks: true});

module.exports = seedPropertyManager;
