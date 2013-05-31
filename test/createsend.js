var chai        = require('chai');
var helper      = require('./helper.js');
var createsend  = require('..')
var should      = chai.should();
var apiKey      = '123123123123123123123';

var api = new createsend({ apiKey: apiKey });

describe('CreateSend', function () {
  it('should get all clients', function (done) {
    helper.stubRequest('clients.json', 'clients.json');
    api.getClients(function (err, clients) {
      clients.length.should.equal(2);
      clients[0].ClientID.should.equal('4a397ccaaa55eb4e6aa1221e1e2d7122');
      clients[0].Name.should.equal('Client One');
      done();
    });
  });

  it('should get billing details', function (done) {
    helper.stubRequest('billingdetails.json', 'billingdetails.json');
    api.getBillingDetails(function (err, billingDetails) {
      billingDetails.Credits.should.equal(3021);
      done();
    });
  });

  it('should get a person\'s api key', function (done) {
    var username = 'myusername';
    var password = 'mypassword';
    var siteUrl = 'http://iamadesigner.createsend.com/';
    helper.stubRequest('apikey.json?siteurl=' + encodeURIComponent(siteUrl), 'apikey.json');
    api.auth = null; // We're clearing it out to make sure we set the auth after pulling it from the server.
    api.getApiKey(siteUrl, username, password, function (err, result) {
      result.ApiKey.should.equal('981298u298ue98u219e8u2e98u2');
      api.auth.apiKey.should.equal('981298u298ue98u219e8u2e98u2');
      done();
    });
  });

  it('should get all countries', function (done) {
    helper.stubRequest('countries.json', 'countries.json');
    api.getCountries(function (err, countries) {
      countries.length.should.equal(245);
      countries.indexOf('Australia').should.equal(11);
      done();
    });
  });

  it('should get all timezones', function (done) {
    helper.stubRequest('timezones.json', 'timezones.json');
    api.getTimezones(function (err, timezones) {
      timezones.length.should.equal(97);
      timezones.indexOf('(GMT+12:00) Fiji').should.equal(61);
      done();
    });
  });
});