const User = require('./User');
const Tenant = require('./Tenant');
const PropertyManager = require('./PropertyManager');
const Request = require('./Request');
const WorkOrder = require('./WorkOrder');

// Tenant belongs to a user
Tenant.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

// PropertyManager belongs to a user
PropertyManager.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

// Request belongs to a tenant
Request.belongsTo(Tenant, {
    foreignKey: 'tenant_id',
    onDelete: 'CASCADE',
});

// WorkOrder belongs to a property manager
WorkOrder.belongsTo(PropertyManager, {
    foreignKey: 'propertymanager_id',
    onDelete: 'CASCADE',
});

// WorkOrder belongs to a request
WorkOrder.belongsTo(Request, {
    foreignKey: 'request_id',
    onDelete: 'CASCADE',
});

// Tenant has many requests
Tenant.hasMany(Request, {
    foreignKey: 'tenant_id',
    onDelete: 'CASCADE',
});

// PropertyManager has many work orders
PropertyManager.hasMany(WorkOrder, {
    foreignKey: 'propertymanager_id',
    onDelete: 'CASCADE',
});
