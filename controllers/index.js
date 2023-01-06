const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const workOrderRoutes = require('./workorders-routes.js');
const requestRoutes = require('./requests-routes.js');
// const dashboardRoutes = require('./dashboard-routes.js');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/workorders', workOrderRoutes);
router.use('/requests', requestRoutes);
// router.use('/dashboard', dashboardRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;