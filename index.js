var libPath = process.env['KALLY_RAZOR_COV'] ? './lib-cov' : './lib';

module.exports = require(libPath + '/createsend');