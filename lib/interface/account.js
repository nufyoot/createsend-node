var CreateSend = require('../createsend');

/**
 * # .clientsList(callback)
 *
 * Get a list list of clients.
 *
 * @name clientsList
 * @param {Function} callback
 * @see http://www.campaignmonitor.com/api/account/#getting_your_clients
 * @api public
 */

CreateSend.prototype.clientsList = function (callback) {
  this.execute('GET', 'clients', null, {}, callback);
};

/**
 * # .getCountries(callback)
 *
 * Get a list list of countries.
 *
 * @name getCountries
 * @param {Function} callback
 * @see http://www.campaignmonitor.com/api/account/#getting_countries
 * @api public
 */

CreateSend.prototype.getCountries = function (callback) {
  this.execute('GET', 'countries', null, {}, callback);
};

/**
 * # .getTimezones(callback)
 *
 * Get a list list of timezones.
 *
 * @name getTimezones
 * @param {Function} callback
 * @see http://www.campaignmonitor.com/api/account/#getting_timezones
 * @api public
 */

CreateSend.prototype.getTimezones = function (callback) {
  this.execute('GET', 'timezones', null, {}, callback);
};

/**
 * # .getSystemdate(callback)
 *
 * Get the current system date..
 *
 * @name getTimezones
 * @param {Function} callback
 * @see http://www.campaignmonitor.com/api/account/#getting_systemdate
 * @api public
 */

CreateSend.prototype.getSystemdate = function (callback) {
  this.execute('GET', 'systemdate', null, {}, callback);
};