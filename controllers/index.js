const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const propertyManagerRoutes = require('./propertymanager-routes.js');
const tenantRoutes = require('./tenant-routes.js');
// const dashboardRoutes = require('./dashboard-routes.js');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/property-manager', propertyManagerRoutes);
router.use('/tenant', tenantRoutes);
// router.use('/dashboard', dashboardRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;