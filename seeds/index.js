const seedUsers = require('./user-seeds');
const seedTenant = require('./tenant-seeds');
const seedPropertyManager = require('./propertymanager-seeds');
const seedRequest = require('./request-seeds');
const seedWorkOrder = require('./workorder-seeds');
const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  await seedUsers();
  await seedTenant();
  await seedPropertyManager();
  await seedRequest();
  await seedWorkOrder();
  process.exit(0);
};

seedAll();
