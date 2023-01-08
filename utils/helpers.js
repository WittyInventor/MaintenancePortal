var moment = require("moment");

const formatDate = (date) => {
  return moment(date).format("MM/DD/YYYY");
};

const formatDateTime = (date) => {
  return moment(date).format("MM/DD/YYYY hh:mm a");
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

const requestNew = (request) => {
  return request.status === "New";
};

const requestsByStatus = (requests, status) => {
  if (!requests) return 0;
  if (!status) return 0;

  if (status === "All") {
    // Add all the counts
    const count = requests.reduce((acc, request) => {
      return acc + request.count;
    }, 0);
    return count;
  } else {
    const count = requests.filter((request) => request.status === status);
    return count[0] ? count[0].count : 0;
  }
};

const consoleLog = (message, val) => {
  console.log("Handlebars: " + message, val);
};

const getFormOptions = (isAdmin) => {
  return !isAdmin ? "disabled" : "";
}

const getWorkOrders = (workorders,unitnumber) => {
 return workorders[unitnumber] ? workorders[unitnumber] : 0;
}

module.exports = {
  formatDate,
  formatDateTime,
  formatCurrency,
  requestNew,
  requestsByStatus,
  consoleLog,
  getFormOptions,
  getWorkOrders
};
