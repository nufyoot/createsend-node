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
    })

    it('should get client details', function (done) {
        api.clients.getClientDetails(testClient.clientId, function (err, details) {
            should.not.exist(err);
            should.exist(details);
            should.exist(details.ApiKey);
            should.exist(details.BasicDetails.Country);
            done();
        });
    });

    it('should create a list', function (done) {
        api.lists.createList(testClient.clientId, {
            'Title': 'a non-basic list :)',
            'ConfirmedOptIn': false
        }, function (err, list) {
            should.not.exist(err);
            should.exist(list);
            should.exist(list.getDetails);
            testList = list;
            done();
        });
    });

    it('should get list details', function (done) {
        api.lists.getListDetails(testList.listId, function (err, details) {
            should.not.exist(err);
            should.exist(details);
            should.exist(details.Title);
            done();
        });
    });

    it('should add a subscriber', function (done) {
        api.subscribers.addSubscriber(testList.listId, {
            'EmailAddress': 'test@test.com',
            'Name': 'New Subscriber',
            'CustomFields': []
        }, function (err, subscriber) {
            should.not.exist(err);
            should.exist(subscriber);
            should.exist(subscriber.getDetails);
            testSubscriber = subscriber;
            done();
        });
    });

    it('should update a subscriber', function (done) {
        api.subscribers.updateSubscriber(testList.listId, testSubscriber.emailAddress, {
            'EmailAddress': 'test2@test.com',
            'Name': 'New Subscriber (Updated)',
            'CustomFields': []
        }, function (err) {
            should.not.exist(err);
            done();
        });
    });
})