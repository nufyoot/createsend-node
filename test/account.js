var chai        = require('chai');
var helper      = require('./helper.js');
var createsend  = require('..')
var should      = chai.should();
var apiKey      = '123123123123123123123';

var api = new createsend({ apiKey: apiKey });

describe('Account', function () {
  it('should add an administrator', function (done) {
    helper.stubRequest('admins.json', 'add_admin.json');
    api.account.add('admin@example.com', 'Test', function (err, admin) {
      should.exist(admin.update);
      admin.emailAddress.should.equal('admin@example.com');
      done();
    });
  });

  it('should get all administrators', function (done) {
    helper.stubRequest('admins.json', 'administrators.json');
    api.account.getAdministrators(function (err, admins) {
      admins.length.should.equal(2);
      admins[0].emailAddress.should.equal('admin1@blackhole.com');
      admins[1].name.should.equal('Admin Two');
      done();
    });
  });

  it('should allow update on Administrator object', function (done) {
    helper.stubRequest('admins.json', 'administrators.json');
    helper.stubRequest('admins.json?email=admin1%40blackhole.com', null);
    api.account.getAdministrators(function (err, admins) {
      admins[0].update('admin45@blackhole.com', 'New Admin Name', function (err, admin) {
        admin.emailAddress.should.equal('admin45@blackhole.com');
        admin.name.should.equal('New Admin Name');
        done();
      });
    });
  });
});