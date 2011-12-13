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

  it('should allow a new subscriber to be added', function (done) {
    api.subscribersAdd(TD.test_list, TD.myinfo, function (err, email) {
      expect(err).to.not.exist;
      expect(email).to.equal(TD.myinfo.EmailAddress);
      done();
    });
  });

});