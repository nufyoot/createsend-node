var chai        = require('chai');
var helper      = require('./helper.js');
var createsend  = require('..')
var should      = chai.should();
var apiKey      = '123123123123123123123';

var api = new createsend({ apiKey: apiKey });

describe('Account', function () {
  it('should get all clients', function (done) {
    helper.stubRequest('clients.json', 'clients.json');
    api.account.getClients(function (err, clients) {
      clients.length.should.equal(2);
      clients[0].ClientID.should.equal('4a397ccaaa55eb4e6aa1221e1e2d7122');
      clients[0].Name.should.equal('Client One');
      done();
    });
  });

  it('should get billing details', function (done) {
    helper.stubRequest('billingdetails.json', 'billingdetails.json');
    api.account.getBillingDetails(function (err, billingDetails) {
      billingDetails.Credits.should.equal(3021);
      done();
    });
  });

  it('should add an administrator', function (done) {
    helper.stubRequest('admins.json', 'add_admin.json');
    api.account.addAdministrator('admin@example.com', 'Test', function (err, admin) {
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
      done();
    });
  });

  it('should allow update of administrator', function (done) {
    helper.stubRequest('admins.json', 'administrators.json');
    helper.stubRequest('admins.json?email=admin1%40blackhole.com', null);
    api.account.updateAdministrator('admin1@blackhole.com', 'admin45@blackhole.com', 'New Admin Name', function (err, admin) {
      admin.emailAddress.should.equal('admin45@blackhole.com');
      done();
    });
  });

  it('should get administrator details', function (done) {
    helper.stubRequest('admins.json?email=admin%40example.com', 'admin_details.json');
    api.account.getAdministratorDetails('admin@example.com', function (err, result) {
      result.EmailAddress.should.equal('admin@example.com');
      done();
    });
  });

  it('should delete administrator', function (done) {
    helper.stubRequest('admins.json?email=admin%40example.com', null);
    api.account.deleteAdministrator('admin@example.com', function (err, result) {
      should.not.exist(err);
      done();
    });
  });

  it('should get primary contact', function (done) {
    helper.stubRequest('primarycontact.json', 'admin_get_primary_contact.json');
    api.account.getPrimaryContact(function (err, result) {
      result.EmailAddress.should.equal('admin@blackhole.com');
      done();
    });
  });

  it('should set primary contact', function (done) {
    helper.stubRequest('primarycontact.json?email=admin%40blackhole.com', 'admin_set_primary_contact.json');
    api.account.setPrimaryContact('admin@blackhole.com', function (err, result) {
      result.EmailAddress.should.equal('admin@blackhole.com');
      done();
    });
  });

  it('should get external session', function (done) {
    helper.stubRequest('externalsession.json', 'external_session.json');
    api.account.externalSession({
      'Email': 'admin@blackhole.com',
      'Chome': 'None',
      'Url': '/subscribers/search?search=belle@example.com',
      'IntegratorID': 'a1b2c3d4e5f6',
      'ClientID': 'aaa111bbb222ccc333'
    }, function (err, result) {
      result.SessionUrl.should.equal('https://external1.createsend.com/cd/create/ABCDEF12/DEADBEEF?url=FEEDDAD1');
      done();
    });
  });
});