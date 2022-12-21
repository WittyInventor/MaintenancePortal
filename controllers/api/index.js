const router = require('express').Router();
const propertymanagerRoutes = require('./propertymanagerroutes');
const requestRoutes = require('./requestRoutes');
const tenantRoutes = require('./tenantRoutes');
const userRoutes = require('./userRoutes');


router.use('/tenant', tenantRoutes);
router.use('/propertymanagerroutes', propertymanagerRoutes);
router.use('/userRoutes', userRoutes);
router.use('/requestRoutes', requestRoutes);


module.exports = router;