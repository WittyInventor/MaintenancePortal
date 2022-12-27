var moment = require('moment');

const formatDate = date => {
  return moment(date).format('MM/DD/YYYY');
}

const formatDateTime = date => {
  return moment(date).format('MM/DD/YYYY hh:mm a');
}

const formatCurrency = amount => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}




module.exports = { formatDate, formatDateTime, formatCurrency }