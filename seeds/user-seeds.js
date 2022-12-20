const sequelize = require('../config/connection');
const User = require('../models/User')

const userdata = [
  {
    username: 'Alicia',
    email: 'a@apartmentsBC.com',
    password: 'password12345'
  },
  {
    username: 'Beto',
    email: 'b@apartmentsBC.com',
    password: 'password12345'
  },
  {
    username: 'Carlos',
    email: 'c@apartmentsBC.com',
    password: 'password12345'
  },
  {
    username: 'Luis Manager',
    email: 'manager@apartmentsBC.com',
    password: 'password12345'
  },
];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;
