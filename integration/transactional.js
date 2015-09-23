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

describe('Transactional', function () {
    var testClient;
    var testList;
    var details = {};
    var emailVar = {
        'releaseCreator': 'just do it',
        'releaseDate': 'make ur dreams come true',
        'releaseTeam': 'DO IT',
        'releaseDescript': 'yesterday you said tomorrow',
        'releaseURLLink': 'so JUST DO IT',
        'releaseURLText': 'if ur tired of starting over',
        'releaseITURL': 'stop giving up'
    };

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
            details.clientID = client.clientId;
            done();
        });
    });

    after(function (done) {
        testClient.delete(function (err) {
            should.not.exist(err);
            done();
        });
    });

    it('should get a smart email list', function (done) {
        api.transactional.smartEmailList(details, function (err, res) {
            should.not.exist(err);
            should.exist(res);
            should.exist(res.length);
            done();
        });
    });

    it('should get smart email details', function (done) {
        details.smartEmailID='53e872f5-d8d7-46c9-b3d2-e7c7fc650708';
        api.transactional.smartEmailDetails(details, function (err, res) {
            should.not.exist(err);
            should.exist(res);
            should.exist(res.SmartEmailID);
            should.exist(res.Name);
            should.exist(res.CreatedAt);
            should.exist(res.Status);
            should.exist(res.Properties);
            should.exist(res.Properties.From);
            should.exist(res.Properties.Subject);
            should.exist(res.Properties.Content);
            done();
        });
    });

    it('should send a smart email', function (done) {
        details.smartEmailID='53e872f5-d8d7-46c9-b3d2-e7c7fc650708';
        details.to=['test@testemail.com.au'];
        details.cc=['fakeemail@fakies.com'];
        details.bcc=['jerry@seinfeld.com'];
        details.data=emailVar;
        details.addRecipientsToList=true;
        api.transactional.sendSmartEmail(details, function (err, res) {
            should.not.exist(err);
            should.exist(res);
            should.exist(res.length);
            done();
        });
    });

    it('should send a classic email', function(done) {
        details.subject="hey yo, this is a classic email";
        details.from='test@testemail.com.au';
        details.replyto='test@testemail.com.au';
        details.to=['test@testemail.com.au'];
        details.cc=['fakeemail@fakies.com'];
        details.bcc=['jerry@seinfeld.com'];
        details.html='<html><p>testing</p></html>';
        details.text=null;
        details.trackopens=null;
        details.trackclicks=null;
        details.inlinecss=null;
        details.classicgroup='Basic Email Test';
        details.addRecipientsToListID='7381da7816dc501194f547cafa2f43a6';
        api.transactional.sendClassicEmail(details, function (err, res) {
            should.not.exist(err);
            should.exist(res);
            should.exist(res.length);
            done();
        });
    });

    it('should get a classic email group list', function (done) {
        api.transactional.classicEmailGroupList(details, function (err, res) {
            should.not.exist(err);
            should.exist(res);
            should.exist(res.length);
            done();
        });
    });

    it('should get statistics for all transactional emails', function (done) {
        api.transactional.statistics(details, function (err, res) {
            should.not.exist(err);
            should.exist(res);
            should.exist(res.Query);
            should.not.exist(res.Query.SmartEmailID);
            should.exist(res.Query.From);
            should.exist(res.Query.To);
            should.exist(res.Query.TimeZone);
            should.exist(res.Sent);
            should.exist(res.Bounces);
            should.exist(res.Delivered);
            should.exist(res.Opened);
            should.exist(res.Clicked);
            done();
        });
    });

    it('should get a message timeline', function (done) {
        api.transactional.messageTimeline(details, function (err, res) {
            should.not.exist(err);
            should.exist(res);
            should.exist(res.length);
            done();
        });
    });

    it('should get the details of a message', function (done) {
        details.messageID='0f35d46f-47c5-11e5-a012-1086f014547c';
        api.transactional.messageDetails(details, function (err, res) {
            should.not.exist(err);
            should.exist(res);
            should.exist(res.MessageID);
            should.exist(res.SentAt);
            should.exist(res.Status);
            should.exist(res.Recipient);
            should.exist(res.Message);
            should.exist(res.Message.From);
            should.exist(res.Message.To);
            should.exist(res.Message.Body);
            should.exist(res.TotalOpens);
            should.exist(res.TotalClicks);
            should.exist(res.CanBeResent);
            done();
        });
    });

    it('should resend a message', function (done) {
        details.messageID='1f4f02b2-577a-11e5-8e36-ed63f5913d87';
        api.transactional.messageResend(details, function (err, res) {
            should.not.exist(err);
            should.exist(res);
            should.exist(res.MessageID);
            should.exist(res.Recipient);
            should.exist(res.Status);
            done();
        });
    });
})