var utils     = require('./interface/utils.js');
var campaigns = require('./interface/campaigns.js');

module.exports = CreateSend;

/**
 * # CreateSend#Constructor
 *
 * Options
 *
 * * Secure
 *
 * @name contructor
 * @param {Object} auth
 * @param {Object} options (optional)
 */

function CreateSend (auth, options) {
  options = options || {};

  var result = {
    version: '0.1.0',
    auth: auth,
    version: 'v3',
    secure: options.secure || true,
    baseUri: options.baseUri || 'api.createsend.com',

    request: function (method, path, qs, params, callback) {
      var uri = ((this.secure) ? 'https' : 'http') + '://' + 
        this.baseUri + '/api/' + this.version + '/' + path + '.json';

      utils.request(this.auth, method, uri, qs, params, callback);
    },

    post: function (path, qs, params, callback) { this.request('POST', path, qs, params, callback); },
    get:  function (path, qs, params, callback) { this.request('GET' , path, qs, params, callback); },
    put:  function (path, qs, params, callback) { this.request('PUT' , path, qs, params, callback); }
  };
  result.campaigns = new campaigns(result);
  return result;
}