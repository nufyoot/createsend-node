var libPath = process.env['CREATESEND_NODE_COV'] ? './lib-cov' : './lib';

module.exports = require(libPath + '/createsend');