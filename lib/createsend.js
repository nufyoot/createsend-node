var utils       = require('./interface/utils.js');
var account     = require('./interface/account.js');
var campaigns   = require('./interface/campaigns.js');
var clients     = require('./interface/clients.js');
var lists       = require('./interface/lists.js');
var subscribers = require('./interface/subscribers.js');
var segments    = require('./interface/segments.js');

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
        secure: options.secure === undefined ? true : options.secure,
        baseUri: options.baseUri || 'api.createsend.com',

        getApiKey: function (siteUrl, username, password, callback) {
            var uri = ((this.secure) ? 'https' : 'http') + '://' +
                this.baseUri + '/api/' + this.version + '/apikey.json';
            var self = this;

            utils.request(this.secure, { username: username, password: password }, 'GET', uri, { siteurl: siteUrl }, null,
              function (err, result) {
                if (!err && !this.auth) {
                  self.auth = { apiKey: result.ApiKey };
                }
                callback(err, result);
              });
        },

        getCountries: function (callback) {
            this.get('countries', null, null, callback);
        },

        getTimezones: function (callback) {
            this.get('timezones', null, null, callback);
        },

        getSystemDate: function (callback) {
            this.get('systemdate', null, null, function (err, result) {
                if (err) { return callback(err); }
                result.SystemDate = new Date(result.SystemDate.replace(/-/g, '/'));
                callback(null, result);
            });
        },

        request: function (method, path, qs, params, callback) {
            var uri = ((this.secure) ? 'https' : 'http') + '://' +
                this.baseUri + '/api/' + this.version + '/' + path + '.json';

            utils.request(this.secure, this.auth, method, uri, qs, params, callback);
        },

        post:   function (path, qs, params, callback) { this.request('POST',   path, qs, params, callback); },
        get:    function (path, qs, params, callback) { this.request('GET' ,   path, qs, params, callback); },
        put:    function (path, qs, params, callback) { this.request('PUT' ,   path, qs, params, callback); },
        delete: function (path, qs, params, callback) { this.request('DELETE', path, qs, params, callback); }
    };

    result.account = new account(result);
    result.campaigns = new campaigns(result);
    result.clients = new clients(result);
    result.lists = new lists(result);
    result.subscribers = new subscribers(result);
    result.segments = new segments(result);
    return result;
}
