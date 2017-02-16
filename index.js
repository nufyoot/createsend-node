var createsend;

if (process.env['CREATESEND_NODE_COV']) {
  createsend = require('./lib-cov/createsend');
} else {
  createsend = require('./lib/createsend');  
}

module.exports = createsend;
