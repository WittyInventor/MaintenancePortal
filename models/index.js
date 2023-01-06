const User = require('./User');
const Request = require('./Request');
const WorkOrder = require('./WorkOrder');

// Request belongs to a tenant
Request.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

// WorkOrder belongs to a request
WorkOrder.belongsTo(Request, {
    foreignKey: 'request_id',
    onDelete: 'CASCADE',
});

// Tenant has many requests
User.hasMany(Request, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});
