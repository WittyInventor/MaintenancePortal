var moment = require('moment');

const formatDate = date => {
  return moment(date).format('MMMM Do YYYY, h:mm a');
}

const formatCurrency = amount => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}




module.exports = { formatDate, formatCurrency }