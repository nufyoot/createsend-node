/****************************************************************************
 * The purpose of this file is to test the account functions against a
 * CreateSend account.  Many of the tests are just to ensure we
 * got something valid back from the server
 ***************************************************************************/
var createsend  = require('../');
var fs          = require('fs');
var chai        = require('chai');

var should      = chai.should();
var apiDetails;
var api;

if (process.env.NODE_ENV == 'integration') {
    apiDetails = JSON.parse(fs.readFileSync('./integration/credentials.json'));
    options = JSON.parse(fs.readFileSync('./integration/options.json'));
    api = new createsend(apiDetails, options);
} else {
    apiDetails = {
        apiKey: "981298u298ue98u219e8u2e98u2",
        siteurl: "",
        username: "",
        password: ""
    };
    api = new createsend(apiDetails, {
        secure: false,
        baseUri: 'localhost:3000'
    })
}

describe('Account', function () {
    it('should get clients', function (done) {
        api.account.getClients(function (err, clientList) {
            should.not.exist(err);
            should.exist(clientList.length);
            should.exist(clientList[0].name);
            done();
        });
    });

    it('should get billing details', function (done) {
        api.account.getBillingDetails(function (err, billing) {
            should.not.exist(err);
            should.exist(billing.credits);
            billing.credits.should.be.a('Number');
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
            done();
        });
    });

    it('should get the system date', function (done) {
        api.getSystemDate(function (err, result) {
            should.not.exist(err);
            should.exist(result);
            should.exist(result.SystemDate);
            should.exist(result.SystemDate.getMonth);
            done();
        });
    });
});
