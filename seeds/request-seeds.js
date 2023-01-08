const Request = require('../models/Request');

let requestdata = [
  {
    user_id: 1,
    categorymaintenance: 'Plumbing',
    description: 'Leaky faucet',
    permissiontoenter: true,
    alarmcode: '1234',
    entrynotes: 'Please call me when you arrive',
    status: 'Accepted',
  },
  {
    user_id: 2,
    categorymaintenance: 'Electrical',
    description: 'Lightbulb out',
    permissiontoenter: true,
    alarmcode: '2343',
    entrynotes: 'Please call me when you arrive',
    status: 'Accepted',
  },
  {
    user_id: 3,
    categorymaintenance: 'Doors and Locks',
    description: 'Door lock broken',
    permissiontoenter: true,
    alarmcode: '6788',
    entrynotes: 'Door is unlocked',
    status: 'Accepted',
  },
  {
    user_id: 3,
    categorymaintenance: 'Appliance',
    description: 'Refrigerator not working',
    permissiontoenter: true,
    alarmcode: '6788',
    entrynotes: 'Door is unlocked',
    status: 'Accepted',
  },
  {
    user_id: 2,
    categorymaintenance: 'Flooring',
    description: 'Flooring damaged',
    permissiontoenter: true,
    alarmcode: '2343',
    entrynotes: 'Please enter through the back door',
    status: 'Accepted',
  },
  {
    user_id: 1,
    categorymaintenance: 'HVAC',
    description: 'AC not working',
    permissiontoenter: true,
    alarmcode: '1234',
    entrynotes: 'Please wait outside',
    status: 'Accepted'
  }
];

const seedRequest = () => Request.bulkCreate(requestdata);

module.exports = seedRequest;
