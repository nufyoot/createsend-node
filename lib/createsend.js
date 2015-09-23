var Utils       = require('./interface/utils.js');
var Account     = require('./interface/account.js');
var Campaigns   = require('./interface/campaigns.js');
var Clients     = require('./interface/clients.js');
var Lists       = require('./interface/lists.js');
var Subscribers = require('./interface/subscribers.js');
var Segments    = require('./interface/segments.js');
var Transactional = require('./interface/transactional.js');

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
        wrapperVersion: '0.8.2',
        auth: auth,
        version: 'v3',
        secure: options.secure === undefined ? true : options.secure,
        baseUri: options.baseUri || 'api.createsend.com',

        getCountries: function (callback) {
            this.get('countries.json', null, null, callback);
        },

        getTimezones: function (callback) {
            this.get('timezones.json', null, null, callback);
        },

        getSystemDate: function (callback) {
            this.get('systemdate.json', null, null, function (err, result) {
                if (err) { return callback(err); }
                result.SystemDate = new Date(result.SystemDate.replace(/-/g, '/'));
                callback(null, result);
            });
        },

        request: function (method, path, qs, params, callback, txBool) {
            var uri = ((this.secure) ? 'https' : 'http') + '://' + this.baseUri + '/api/' + (txBool ? 'v3.1' : this.version) + '/' + path;

            Utils.request(this.secure, this.auth, method, uri, qs, params, callback);
        },

        post:   function (path, qs, params, callback, txBool) { this.request('POST',   path, qs, params, callback, txBool); },
        get:    function (path, qs, params, callback, txBool) { this.request('GET' ,   path, qs, params, callback, txBool); },
        put:    function (path, qs, params, callback, txBool) { this.request('PUT' ,   path, qs, params, callback, txBool); },
        delete: function (path, qs, params, callback, txBool) { this.request('DELETE', path, qs, params, callback, txBool); }
    };

    result.account = new Account(result);
    result.campaigns = new Campaigns(result);
    result.clients = new Clients(result);
    result.lists = new Lists(result);
    result.subscribers = new Subscribers(result);
    result.segments = new Segments(result);
    result.transactional = new Transactional(result);
    return result;
}
