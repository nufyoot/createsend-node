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

describe('Subscribers', function () {
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
            // This timeout is necessary.  CM adds subscribers async so we need to wait from them to catch up.
            isIntegrationTest && sleep.sleep(1);
            done();
        });
    });

    it('should update a subscriber', function (done) {
        api.subscribers.updateSubscriber(testList.listId, 'test@test.com', {
            'EmailAddress': 'test2@test.com',
            'Name': 'New Subscriber (Updated)',
            'CustomFields': []
        }, function (err) {
            should.not.exist(err);
            // This timeout is necessary.  CM updates subscribers async so we need to wait from them to catch up.
            isIntegrationTest && sleep.sleep(1);
            done();
        });
    });

    it('should get subscriber details', function (done) {
        api.subscribers.getSubscriberDetails(testList.listId, 'test2@test.com', function (err, details) {
            should.not.exist(err);
            should.exist(details);
            details.Name.should.equal('New Subscriber (Updated)');
            done();
        });
    });

    it('should get subscriber history', function (done) {
        api.subscribers.getSubscriberHistory(testList.listId, 'test2@test.com', function (err, history) {
            should.not.exist(err);
            should.exist(history);
            should.exist(history.length);
            done();
        });
    });

    it('should unsubscribe', function (done) {
        api.subscribers.unsubscribeSubscriber(testList.listId, 'test2@test.com', function (err) {
            should.not.exist(err);
            done();
        });
    });

    it('should delete a subscriber', function (done) {
        api.subscribers.deleteSubscriber(testList.listId, 'test2@test.com', function (err) {
            should.not.exist(err);
            done();
        });
    });

    it('should import subscribers', function (done) {
        api.subscribers.import(testList.listId, {
            'Subscribers': [
                {
                    'EmailAddress': 'test3@test.com',
                    'Name': 'Test Number 3',
                    'CustomFields': []
                },
                {
                    'EmailAddress': 'test4@test.com',
                    'Name': 'Test Number 4',
                    'CustomFields': []
                },
                {
                    'EmailAddress': 'test5@test.com',
                    'Name': 'Test Number 5',
                    'Custom Fields': []
                }
            ]
        }, function (err, result) {
            should.not.exist(err);
            should.exist(result);
            result.TotalNewSubscribers.should.equal(3);
            done();
        })
    });
})
