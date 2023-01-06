const sequelize = require('../config/connection');
const User = require('../models/User')

const userdata = [
  {
    username: 'admin',
    email: 'admin@apartmentsBC.com',
    password: 'password12345',
    isAdmin: true
  },
  {
    username: 'Beto',
    email: 'b@apartmentsBC.com',
    password: 'password12345',
    unitnumber: 'A1',
    phoneinfo: '100-456-7890'
  },
  {
    username: 'Carlos',
    email: 'c@apartmentsBC.com',
    password: 'password12345',
    unitnumber: 'A2',
    phoneinfo: '400-456-7890'
  },
  {
    username: 'Luis Manager',
    email: 'manager@apartmentsBC.com',
    password: 'password12345',
    unitnumber: 'A3',
    phoneinfo: '200-456-7890'
  },
];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;
