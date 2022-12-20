const sequelize = require('../config/connection');
const Tenant  = require('../models/Tenant');

const tenantdata = [
  {
    user_id: 4,
    unitnumber: 'A1',
    phoneinfo: '100-456-7890'
  },
  {
    user_id: 2,
    unitnumber: 'A2',
    phoneinfo: '111-456-7890'
  },
  {
    user_id: 3,
    unitnumber: 'A3',
    phoneinfo: '222-456-7890'
  },

];

const seedTenant = () => Tenant.bulkCreate(tenantdata, {individualHooks: true});

module.exports = seedTenant;
