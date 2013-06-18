/****************************************************************************
 * The purpose of this file is to test the account functions against a 
 * CreateSend account.  Many of the tests are just to ensure we
 * got something valid back from the server
 ***************************************************************************/
var createsend  = require('../');
var fs          = require('fs');
var chai        = require('chai');

var should      = chai.should();
var apiDetails  = JSON.parse(fs.readFileSync('./integration/credentials.json'));
var api         = new createsend(apiDetails);

describe('Account', function () {
    it('should get clients', function (done) {
        api.account.getClients(function (err, clientList) {
            should.not.exist(err);
            should.exist(clientList.length);
            should.exist(clientList[0].Name);
            done();
        });
    });

    it('should get billing details', function (done) {
        api.account.getBillingDetails(function (err, billing) {
            should.not.exist(err);
            should.exist(billing.Credits);
            billing.Credits.should.equal(0);
            done();
        });
    });

    it('should get your API key', function (done) {
        api.getApiKey(apiDetails.siteurl, apiDetails.username, apiDetails.password, function (err, key) {
            should.not.exist(err);
            should.exist(key.ApiKey);
            key.ApiKey.should.equal(apiDetails.apiKey);
            done();
        });
    });

    it('should get the list of countries', function (done) {
        api.getCountries(function (err, countries) {
            should.not.exist(err);
            should.exist(countries);
            countries.should.have.length(251);
            countries[100].should.equal('Hungary');
            done();
        });
    });

    it('should get valid timezones', function (done) {
        api.getTimezones(function (err, timezones) {
            should.not.exist(err);
            should.exist(timezones);
            timezones.should.have.length(101);
            timezones[15].should.equal('(GMT+02:00) Harare, Pretoria');
            done();
        });
    });
});