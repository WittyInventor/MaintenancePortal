const router = require('express').Router();
const propertymanagerRoutes = require('./propertymanagerroutes');
const requestRoutes = require('./requestroutes');
const tenantRoutes = require('./tenantroutes');
const userRoutes = require('./userroutes');
const workorderRoutes = require('./workorderroutes');


router.use('/tenants', tenantRoutes);
router.use('/propertymanagers', propertymanagerRoutes);
router.use('/users', userRoutes);
router.use('/requests', requestRoutes);
router.use('/workorders', workorderRoutes);


module.exports = router;