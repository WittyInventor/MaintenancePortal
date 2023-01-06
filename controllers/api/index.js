const router = require('express').Router();
const requestRoutes = require('./requestroutes');
const userRoutes = require('./userroutes');
const workorderRoutes = require('./workorderroutes');

router.use('/users', userRoutes);
router.use('/requests', requestRoutes);
router.use('/workorders', workorderRoutes);

module.exports = router;