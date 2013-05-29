var request = require('request')
  , querystring = require('querystring');

var exports = module.exports = CreateSend;

exports.version = '0.0.2';

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
  this.baseUri = options.baseUri || "api.createsend.com";
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

CreateSend.prototype.execute = function (method, path, qs, params, callback) {
  var auth = 'Basic ' + new Buffer(this.apiKey + ':magic').toString('base64')
    , uri = ((this.secure) ? 'https' : 'http') + '://' + this.baseUri + '/api/';

  callback = callback || function () {};
  uri = uri + this.version + '/' + path + '.json';

  if (qs) {
    uri = uri + '?' + querystring.stringify(qs);
  }

  request(
    { method: method
    , uri: uri
    , headers:
      { 'Authorization' : auth
      , 'User-Agent' : 'node-createsend/v' + exports.version }
    , body: JSON.stringify(params) }
  , function (error, response, body) {
      var code = response.statusCode;
      if (code == 200 || code == 201) {
        if (body) {
          callback(null, JSON.parse(body));
        } else {
          callback(null);
        }
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
