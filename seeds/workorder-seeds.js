const WorkOrder  = require('../models/WorkOrder');

const workorderdata = [
  {
    propertymanager_id: 1,
    request_id: 1,
    ordernumber: 'O001',
    status: 'Open',
    levelofurgency: 'Low',
    assignedto: 'John A',
    notes: 'This is a note',
    invoice: 'I001',
    invoiceamount: 100.00,
  },
  {
    propertymanager_id: 1,
    request_id: 2,
    ordernumber: 'O002',
    status: 'In Progress',
    levelofurgency: 'Medium',
    assignedto: 'John B',
    notes: 'Need new light bulb',
    invoice: 'I002',
    invoiceamount: 2.00,
  },
  {
    propertymanager_id: 1,
    request_id: 3,
    ordernumber: 'O003',
    status: 'Completed',
    levelofurgency: 'High',
    assignedto: 'John C',
    notes: 'Need new lock',
    invoice: 'I003',
    invoiceamount: 30.00,
  },
  {
    propertymanager_id: 1,  
    request_id: 4,
    ordernumber: 'O004',
    status: 'Open',
    levelofurgency: 'Low',
    assignedto: 'John D',
    notes: 'Ice Maker not working',
    invoice: 'I004',
    invoiceamount: 400.00,
  },
  {
    propertymanager_id: 1,
    request_id: 5,
    ordernumber: 'O005',
    status: 'In Progress',
    levelofurgency: 'Medium',
    assignedto: 'John E',
    notes: 'Floor needs to be replaced',
    invoice: 'I005',
    invoiceamount: 500.00,
  },
  {
    propertymanager_id: 1,
    request_id: 6,
    ordernumber: 'O006',
    status: 'Completed',
    levelofurgency: 'High',
    assignedto: 'John F',
    notes: 'AC not cooling',
    invoice: 'I006',
    invoiceamount: 600.00,
  },
];

const seedWorkOrder = () => WorkOrder.bulkCreate(workorderdata);

module.exports = seedWorkOrder;
