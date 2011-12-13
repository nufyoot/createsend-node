var expect = require('chai').expect
  , fs = require('fs')
  , createsend = require('..');

try {
  var TD = JSON.parse(fs.readFileSync(__dirname + '/test_data.json', 'ascii'));
} catch (err) {
  sys.puts(sys.inspect(err));
  console.error('');
  console.error('Testing requires ./test_data.json to contain a JSON string with api key in order to run tests.');
  console.error('');
  process.exit(1);
}

var api = new createsend(TD.api_key);

describe('CreateSend Subscribers', function () {
  var listId;

  before(function (done) {
    var list = {
      "Title": "CreateSend Test List for subscribers.js",
      "UnsubscribePage": "http://www.example.com/unsubscribed.html",
      "ConfirmedOptIn": false,
      "ConfirmationSuccessPage": "http://www.example.com/joined.html"
    };

    api.listCreate(TD.test_client, list, function (err, _id) {
      expect(err).to.not.exist;
      expect(_id).to.be.a('string');
      listId = _id;
      done();
    });
  });

  after(function (done) {
    api.listDelete(listId, function (err) {
      expect(err).to.not.exist;
      done();
    });
  });

  afterEach(function (done) {
    api.subscriberDelete(listId, TD.new_subscriber.EmailAddress, done);
  });

  it('should allow a subscriber to be added, updated, deleted', function (done) {
    // ADD
    api.subscriberAdd(listId, TD.new_subscriber, function (err, email) {
      expect(err).to.not.exist;
      expect(email).to.equal(TD.new_subscriber.EmailAddress);

      // UPDATE
      api.subscriberUpdate(listId, email, TD.new_subscriber_revised, function (err) {
        expect(err).to.not.exist;

        // DELETE
        api.subscriberDelete(listId, TD.new_subscriber_revised.EmailAddress, function (err) {
          expect(err).to.not.exist;
          done();
        }); // end delete
      }); // end update
    }); // end add

  });

  it('should allow for the retrieval of a subscribers details', function (done) {
    api.subscriberAdd(listId, TD.new_subscriber, function (err, email) {
      expect(err).to.not.exist;
      expect(email).to.equal(TD.new_subscriber.EmailAddress);

      // DETAILS
      api.subscriberDetails(listId, email, function (err, subscriber) {
        expect(err).to.not.exist;
        expect(subscriber)
          .to.have.property('EmailAddress', TD.new_subscriber.EmailAddress);
        done();
      }); // end update
    }); // end add
  });

  it('should allow for the retrieval of a subscribers history', function (done) {
    api.subscriberAdd(listId, TD.new_subscriber, function (err, email) {
      expect(err).to.not.exist;
      expect(email).to.equal(TD.new_subscriber.EmailAddress);

      // HISTORY
      api.subscriberHistory(listId, email, function (err, subscriber) {
        expect(err).to.not.exist;
        expect(subscriber)
          .to.be.instanceof(Array);
        done();
      }); // end history
    }); // end add
  });

  it('should allow for a subscriber to be unsubscribed', function (done) {
    api.subscriberAdd(listId, TD.new_subscriber, function (err, email) {
      expect(err).to.not.exist;
      expect(email).to.equal(TD.new_subscriber.EmailAddress);

      api.subscriberUnsubscribe(listId, email, function (err) {
        expect(err).to.not.exist;
        done();
      });
    });
  });

  it('should allow many subscribers to be imported', function (done) {
    api.subscribersImport(listId, TD.import_subscribers, function (err, resp) {
      expect(err).to.not.exist;
      expect(resp).to.have.property('TotalNewSubscribers', 3);
      done();
    });
  });

});