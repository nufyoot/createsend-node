/****************************************************************************
 * The purpose of this file is to test the account functions against a 
 * CreateSend account.  Many of the tests are just to ensure we
 * got something valid back from the server
 ***************************************************************************/
var createsend  = require('../');
var fs          = require('fs');
var chai        = require('chai');
var sleep       = require('sleep');

var should      = chai.should();
var apiDetails;
var api;
var isIntegrationTest = process.env.NODE_ENV == 'integration';

if (isIntegrationTest) {  
    apiDetails = JSON.parse(fs.readFileSync('./integration/credentials.json'));
    api = new createsend(apiDetails);
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

describe('Clients', function () {
    var testClient;
    var testList;
    var testSubscriber;

    before(function (done) {
        api.clients.addClient({
            'CompanyName': 'Client One',
            'Country': 'Australia',
            'TimeZone': '(GMT+10:00) Canberra, Melbourne, Sydney'
        }, function (err, client) {
            should.not.exist(err);
            should.exist(client);
            should.exist(client.getDetails);
            testClient = client;
            done();
        });
    });

    after(function (done) {
        testClient.delete(function (err) {
            should.not.exist(err);
            done();
        });
    });
})