const sequelize = require('../config/connection');
const User = require('../models/User')

const userdata = [
  {
    username: 'admin',
    email: 'admin@apartmentsBC.com',
    password: 'password12345',
    role: 'Manager',
    isAdmin: true
  },
  {
    username: 'Beto',
    email: 'br6366820@gmail.com',
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
    username: 'Luis',
    email: 'manager@apartmentsBC.com',
    password: 'password12345',
    unitnumber: 'A3',
    phoneinfo: '200-456-7890'
  },
  {
    username: 'Pedro',
    email: 'pedro@apartmentsBC.com',
    password: 'password12345',
    unitnumber: 'A4',
    phoneinfo: '200-456-7891'
  },
  {
    username: 'Paco',
    email: 'paco@apartmentsBC.com',
    password: 'password12345',
    unitnumber: 'A5',
    phoneinfo: '200-456-7892'
  },
  {
    username: 'Hugo',
    email: 'hugo@apartmentsBC.com',
    password: 'password12345',
    unitnumber: 'A6',
    phoneinfo: '200-456-7893'
  },
  {
    username: 'Daniel',
    email: 'daniel@apartmentsBC.com',
    password: 'password12345',
    unitnumber: 'A7',
    phoneinfo: '200-456-7893'
  },
  {
    username: 'Jack Handyman',
    email: 'jack@apartmentsBC.com',
    password: 'password12345',
    phoneinfo: '300-456-7890',
    role: 'Worker'
  },
  {
    username: 'Jhon Electrician',
    email: 'jhon@apartmentsBC.com',
    password: 'password12345',
    phoneinfo: '200-456-7890',
    role: 'Worker'
  },
  {
    username: 'Donald Plumber',
    email: 'donald@apartmentsBC.com',
    password: 'password12345',
    phoneinfo: '250-556-7890',
    role: 'Worker'
  },
];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;
