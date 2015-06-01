var Utils       = require('./interface/utils.js');
var Account     = require('./interface/account.js');
var Campaigns   = require('./interface/campaigns.js');
var Clients     = require('./interface/clients.js');
var Lists       = require('./interface/lists.js');
var Subscribers = require('./interface/subscribers.js');
var Segments    = require('./interface/segments.js');

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
        version: '0.7.4',
        auth: auth,
        version: 'v3',
        secure: options.secure === undefined ? true : options.secure,
        baseUri: options.baseUri || 'api.createsend.com',

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

            Utils.request(this.secure, this.auth, method, uri, qs, params, callback);
        },

        post:   function (path, qs, params, callback) { this.request('POST',   path, qs, params, callback); },
        get:    function (path, qs, params, callback) { this.request('GET' ,   path, qs, params, callback); },
        put:    function (path, qs, params, callback) { this.request('PUT' ,   path, qs, params, callback); },
        delete: function (path, qs, params, callback) { this.request('DELETE', path, qs, params, callback); }
    };

    result.account = new Account(result);
    result.campaigns = new Campaigns(result);
    result.clients = new Clients(result);
    result.lists = new Lists(result);
    result.subscribers = new Subscribers(result);
    result.segments = new Segments(result);
    return result;
}
