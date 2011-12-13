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

describe('CreateSend Account', function () {

  it('should get a list of client', function (done) {
    api.clientsList(function (err, clients) {
      expect(err).to.not.exist;
      expect(clients)
        .to.be.instanceof(Array);
      done();
    });
  });

  it('should get a list of countries', function (done) {
    api.getCountries(function (err, countries) {
      expect(err).to.not.exist;
      expect(countries)
        .to.be.instanceof(Array)
        .and.contain('United States of America');
      done();
    });
  });

  it('should get a list of timezones', function (done) {
    api.getTimezones(function (err, timezones) {
      expect(err).to.not.exist;
      expect(timezones)
        .to.be.instanceof(Array)
        .and.contain('(GMT-05:00) Eastern Time (US & Canada)');
      done();
    });
  });

  it('should get a system data', function (done) {
    api.getSystemdate(function (err, sysdate) {
      expect(err).to.not.exist;
      expect(sysdate)
        .to.be.a('object')
        .and.property('SystemDate').to.be.a('string');
      done();
    });
  });

});