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

describe('CreateSend Client', function () {

  var newClientId
    , skip = false;

  /**
   * Please note, CM only allows you to create (5) clients per
   * a (30) minute period. As such, these tests will be skipped ifthe
   * before function returns that specific error.
   *
   * All tests must have the following as the first line.
   *      if (skip) return done();
   */

  before(function (done) {
    api.clientCreate(TD.new_client, function (err, clientId) {
      // we have exceeded our create limit, so we are going to skip this test for now.
      if (err.Code == 172) skip = true;
      newClientId = clientId;
      done();
    });
  });

  after(function (done) {
    if (skip) return done();
    api.clientDelete(newClientId, function (err) {
      done();
    });
  });

  it('should get a list of client', function (done) {
    if (skip) return done();
    console.log('executed');
    done();
  });

});