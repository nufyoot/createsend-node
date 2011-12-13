var request = require('request');

var exports = module.exports = CreateSend;

exports.version = '0.0.1';

/**
 * # CreateSend#Constructor
 *
 * Options
 *
 * * Secure
 *
 * @name contructor
 * @param {String} apiKey
 * @param {Object} options (optional)
 */

function CreateSend (apiKey, options) {
  options = options || {};
  this.apiKey = apiKey;
  this.version = 'v3';
  this.secure = options.secure || true;
}

/**
 * # .execute(method, path, [params], [callback])
 *
 * @name execute
 * @api private
 * @param {String} method GET, POST, DELETE
 * @param {String} path
 * @param {Object} parameters to JSON.stringify into request body
 * @param {Function} callback
 */

CreateSend.prototype.execute = function (method, path, params, callback) {
  var auth = 'Basic ' + new Buffer(this.apiKey + ':magic').toString('base64')
    , uri = (this.secure) ? 'https://api.createsend.com/api/' : 'http://api.createsend.com/api/';

  callback = callback || function () {};
  uri = uri + this.version + '/' + path + '.json';

  request(
    { method: method
    , uri: uri
    , headers:
      { 'Authorization' : auth
      , 'User-Agent' : 'node-createsend/v' + exports.version }
    , body: JSON.stringify(params) }
  , function (error, response, body) {
      if (response.statusCode == 200) {
        callback(null, JSON.parse(body));
      } else {
        callback(JSON.parse(body));
      }
    });
};

/*!
 * load all of api interfaces
 */

require('./interface/account');
require('./interface/campaigns');
require('./interface/clients');
require('./interface/lists');
require('./interface/segments');
require('./interface/subscribers');
require('./interface/templates');
