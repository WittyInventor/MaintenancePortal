const seedUsers = require('./user-seeds');
const seedRequest = require('./request-seeds');
const seedWorkOrder = require('./workorder-seeds');
const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  await seedUsers();
  await seedRequest();
  await seedWorkOrder();
  process.exit(0);
};

seedAll();
