var chai        = require('chai');
var helper      = require('./helper.js');
var createsend  = require('..')
var should      = chai.should();
var apiKey      = '123123123123123123123';

var api = new createsend({ apiKey: apiKey });

describe('Account', function () {
  var account;

  before(function () {
    account = new createsend.Account(api, 'admin@example.com');
  });

  it('should add an administrator', function (done) {
    helper.stubRequest('admins.json', 'add_admin.json');
    createsend.Account.add(api, 'admin@example.com', 'Test', function (err, admin) {
      should.exist(admin.update);
      admin.email.should.equal('admin@example.com');
      done();
    });
  });

  it('should update an administrator', function (done) {
    helper.stubRequest('admins.json?email=admin%40example.com', null);
    account.update('new_email_address2@example.com', 'Admin Name', function (err, admin) {
      admin.email.should.equal('new_email_address2@example.com');
      done();
    });
  });
});