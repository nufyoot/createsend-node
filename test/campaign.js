var chai        = require('chai');
var helper      = require('./helper.js');
var createsend  = require('..')
var should      = chai.should();
var apiKey      = '123123123123123123123';
var clientId    = '87y8d7qyw8d7yq8w7ydwqwd';
var campaignId  = '787y87y87y87y87y87y87';

var api = new createsend({ apiKey: apiKey });

describe('Campaigns', function () {
  it('should create a campaign', function (done) {
    helper.stubRequest('campaigns/' + clientId + '.json', 'create_campaign.json');
    api.campaigns.create(clientId, {
        'Name': 'name',
        'Subject': 'subject',
        'FromName': 'g\'day',
        'FromEmail': 'good.day@example.com',
        'ReplyTo': 'good.day@example.com',
        'HtmlUrl': 'http://example.com/campaign.html',
        'TextUrl': 'http://example.com/campaign.txt',
        'ListIDs': [
          '7y12989e82ue98u2e',
          'dh9w89q8w98wudwd989'
        ],
        'SegmentIDs': [
          'y78q9w8d9w8ud9q8uw', 
          'djw98quw9duqw98uwd98'
        ]
      }, 
      function (err, campaign) {
        campaign.campaignId.should.equal('787y87y87y87y87y87y87');
        done();
      }
    );
  });

  it('should create a campaign from a template', function (done) {
    templateContent = {
      Singlelines: [
        {
          Content: 'This is a heading',
          Href: 'http://example.com/'
        }
      ],
      Multilines: [
        {
          Content: '<p>This is example</p><p>multiline \
          <a href="http://example.com">content</a>...</p>'
        }
      ],
      Images:[
        {
          Content: 'http://example.com/image.png',
          Alt: 'This is alt text for an image',
          Href: 'http://example.com/'
        }
      ],
      Repeaters: [
        {
          Items: [
            {
              Layout: 'My layout',
              Singlelines: [
                {
                  Content: 'This is a repeater heading',
                  Href: 'http://example.com/'
                }
              ],
              Multilines: [
                {
                  Content: '<p>This is example</p><p>multiline \
                  <a href="http://example.com">content</a>...</p>'
                }
              ],
              Images: [
                {
                  Content: 'http://example.com/repeater-image.png',
                  Alt: 'This is alt text for a repeater image',
                  Href: 'http://example.com/'
                }
              ]
            }
          ]
        }
      ]
    }

    helper.stubRequest('campaigns/' + clientId + '/fromtemplate.json', 'create_campaign.json');
    api.campaigns.createFromTemplate(clientId, {
        'Subject': 'subject',
        'Name': 'name',
        'FromName': 'g\'day',
        'FromEmail': 'good.day@example.com',
        'ReplyTo': 'good.day@example.com',
        'ListIDs': [ '7y12989e82ue98u2e', 'dh9w89q8w98wudwd989' ], 
        'SegmentIDs': [ 'y78q9w8d9w8ud9q8uw', 'djw98quw9duqw98uwd98' ],
        'TemplateID': '7j8uw98udowy12989e8298u2e', 
        'TemplateContent': templateContent
      },
      function (err, campaign) {
        campaign.campaignId.should.equal('787y87y87y87y87y87y87');
        done();
      }
    )
  });

  it('should send a draft campaign', function (done) {
    helper.stubRequest('campaigns/' + campaignId + '/send.json', null);
    api.campaigns.sendDraft(campaignId, {
      'ConfirmationEmail': 'confirmation@example.com, another@example.com',
      'SendDate': 'Immediately'
    }, function (err, result) {
      should.not.exist(err);
      done();
    });
  });

  it('should send a preview', function (done) {
    helper.stubRequest('campaigns/' + campaignId + '/sendpreview.json', null);
    api.campaigns.sendPreview(campaignId, {
      'PreviewRecipients': [ 'test1@example.com', 'test2@example.com' ],
      'Personalize': 'Random'
    }, function (err, result) {
      should.not.exist(err);
      done();
    });
  });

  it('should delete a campaign', function (done) {
    helper.stubRequest('campaigns/' + campaignId + '.json', null);
    api.campaigns.delete(campaignId, function (err, result) {
      should.not.exist(err);
      done();
    });
  });

  it('should unschedule campaign', function (done) {
    helper.stubRequest('campaigns/' + campaignId + '/unschedule.json', null);
    api.campaigns.unschedule(campaignId, function (err, result) {
      should.not.exist(err);
      done();
    });
  });

  it('should get a summary', function (done) {
    helper.stubRequest('campaigns/' + campaignId + '/summary.json', 'campaign_summary.json');
    api.campaigns.getSummary(campaignId, function (err, summary) {
      summary.Recipients.should.equal(5);
      summary.TotalOpened.should.equal(10);
      summary.Clicks.should.equal(0);
      summary.Unsubscribed.should.equal(0);
      summary.Bounced.should.equal(0);
      summary.UniqueOpened.should.equal(5);
      summary.Mentions.should.equal(23);
      summary.Forwards.should.equal(11)
      summary.Likes.should.equal(32);
      summary.WebVersionURL.should.equal('http://createsend.com/t/r-3A433FC72FFE3B8B');
      summary.WebVersionTextURL.should.equal('http://createsend.com/t/r-3A433FC72FFE3B8B/t');
      summary.WorldviewURL.should.equal('http://client.createsend.com/reports/wv/r/3A433FC72FFE3B8B');
      summary.SpamComplaints.should.equal(23);
      done();
    });
  });

  it('should get email client usage', function (done) {
    helper.stubRequest('campaigns/' + campaignId + '/emailclientusage.json', 'email_client_usage.json');
    api.campaigns.getEmailClientUsage(campaignId, function (err, usage) {
      usage.length.should.equal(6);
      usage[0].Client.should.equal('iOS Devices');
      usage[0].Version.should.equal('iPhone');
      usage[0].Percentage.should.equal(19.83);
      usage[0].Subscribers.should.equal(7056);
      done();
    });
  });

  it('should get lists and segments', function (done) {
    helper.stubRequest('campaigns/' + campaignId + '/listsandsegments.json', 'campaign_listsandsegments.json');
    api.campaigns.getListsAndSegments(campaignId, function (err, listsAndSegments) {
      listsAndSegments.Lists.length.should.equal(1);
      listsAndSegments.Segments.length.should.equal(1);
      listsAndSegments.Lists[0].Name.should.equal('List One');
      listsAndSegments.Lists[0].ListID.should.equal('a58ee1d3039b8bec838e6d1482a8a965');
      listsAndSegments.Segments[0].Title.should.equal('Segment for campaign');
      listsAndSegments.Segments[0].ListID.should.equal('2bea949d0bf96148c3e6a209d2e82060');
      listsAndSegments.Segments[0].SegmentID.should.equal('dba84a225d5ce3d19105d7257baac46f');
      done();
    });
  });

  it('should get the recipients', function (done) {
    helper.stubRequest('campaigns/' + campaignId + '/recipients.json', 'campaign_recipients.json');
    api.campaigns.getRecipients(campaignId, null, function (err, recipients) {
      recipients.ResultsOrderedBy.should.equal('email');
      recipients.OrderDirection.should.equal('asc');
      recipients.PageNumber.should.equal(1);
      recipients.PageSize.should.equal(20);
      recipients.RecordsOnThisPage.should.equal(20);
      recipients.TotalNumberOfRecords.should.equal(2200);
      recipients.NumberOfPages.should.equal(110);
      recipients.Results.length.should.equal(20);
      recipients.Results[0].EmailAddress.should.equal('subs+6g76t7t0@example.com');
      recipients.Results[0].ListID.should.equal('a994a3caf1328a16af9a69a730eaa706');
      done();
    });
  });

  it('should get the bounces', function (done) {
    helper.stubRequest('campaigns/' + campaignId + '/bounces.json', 'campaign_bounces.json');
    api.campaigns.getBounces(campaignId, null, function (err, bounces) {
      bounces.Results.length.should.equal(2);
      bounces.Results[0].EmailAddress.should.equal('asdf@softbouncemyemail.com');
      bounces.Results[0].ListID.should.equal('654523a5855b4a440bae3fb295641546');
      bounces.Results[0].BounceType.should.equal('Soft');
      bounces.Results[0].Date.should.equal('2010-07-02 16:46:00');
      bounces.Results[0].Reason.should.equal('Bounce - But No Email Address Returned ');
      bounces.ResultsOrderedBy.should.equal('date');
      bounces.OrderDirection.should.equal('asc');
      bounces.PageNumber.should.equal(1);
      bounces.PageSize.should.equal(1000);
      bounces.RecordsOnThisPage.should.equal(2);
      bounces.TotalNumberOfRecords.should.equal(2);
      bounces.NumberOfPages.should.equal(1);
      done();
    });
  });

  it('should get opens', function (done) {
    helper.stubRequest('campaigns/' + campaignId + '/opens.json', 'campaign_opens.json');
    api.campaigns.getOpens(campaignId, null, function (err, opens) {
      opens.Results.length.should == 5
      opens.Results[0].EmailAddress.should.equal('subs+6576576576@example.com');
      opens.Results[0].ListID.should.equal('512a3bc577a58fdf689c654329b50fa0');
      opens.Results[0].Date.should.equal('2010-10-11 08:29:00');
      opens.Results[0].IPAddress.should.equal('192.168.126.87');
      opens.Results[0].Latitude.should.equal(-33.8683);
      opens.Results[0].Longitude.should.equal(151.2086);
      opens.Results[0].City.should.equal('Sydney');
      opens.Results[0].Region.should.equal('New South Wales');
      opens.Results[0].CountryCode.should.equal('AU');
      opens.Results[0].CountryName.should.equal('Australia');
      opens.ResultsOrderedBy.should.equal('date');
      opens.OrderDirection.should.equal('asc');
      opens.PageNumber.should.equal(1);
      opens.PageSize.should.equal(1000);
      opens.RecordsOnThisPage.should.equal(5);
      opens.TotalNumberOfRecords.should.equal(5);
      opens.NumberOfPages.should.equal(1);
      done();
    });
  });

  it('should get clicks', function (done) {
    helper.stubRequest('campaigns/' + campaignId + '/clicks.json', 'campaign_clicks.json');
    api.campaigns.getClicks(campaignId, null, function (err, clicks) {
      clicks.Results.length.should.equal(3);
      clicks.Results[0].EmailAddress.should.equal('subs+6576576576@example.com');
      clicks.Results[0].URL.should.equal('http://video.google.com.au/?hl=en&tab=wv');
      clicks.Results[0].ListID.should.equal('512a3bc577a58fdf689c654329b50fa0');
      clicks.Results[0].Date.should.equal('2010-10-11 08:29:00');
      clicks.Results[0].IPAddress.should.equal('192.168.126.87');
      clicks.Results[0].Latitude.should.equal(-33.8683);
      clicks.Results[0].Longitude.should.equal(151.2086);
      clicks.Results[0].City.should.equal('Sydney');
      clicks.Results[0].Region.should.equal('New South Wales');
      clicks.Results[0].CountryCode.should.equal('AU');
      clicks.Results[0].CountryName.should.equal('Australia');
      clicks.ResultsOrderedBy.should.equal('date');
      clicks.OrderDirection.should.equal('asc');
      clicks.PageNumber.should.equal(1);
      clicks.PageSize.should.equal(1000);
      clicks.RecordsOnThisPage.should.equal(3);
      clicks.TotalNumberOfRecords.should.equal(3);
      clicks.NumberOfPages.should.equal(1);
      done();
    });
  });

  it('should get unsubscribes', function (done) {
    helper.stubRequest('campaigns/' + campaignId + '/unsubscribes.json', 'campaign_unsubscribes.json');
    api.campaigns.getUnsubscribes(campaignId, null, function (err, unsubscribes) {
      unsubscribes.Results.length.should.equal(1);
      unsubscribes.Results[0].EmailAddress.should.equal('subs+6576576576@example.com');
      unsubscribes.Results[0].ListID.should.equal('512a3bc577a58fdf689c654329b50fa0');
      unsubscribes.Results[0].Date.should.equal('2010-10-11 08:29:00');
      unsubscribes.Results[0].IPAddress.should.equal('192.168.126.87');
      unsubscribes.ResultsOrderedBy.should.equal('date');
      unsubscribes.OrderDirection.should.equal('asc');
      unsubscribes.PageNumber.should.equal(1);
      unsubscribes.PageSize.should.equal(1000);
      unsubscribes.RecordsOnThisPage.should.equal(1);
      unsubscribes.TotalNumberOfRecords.should.equal(1);
      unsubscribes.NumberOfPages.should.equal(1);
      done();
    });
  });

  it('should get spam complaints', function (done) {
    helper.stubRequest('campaigns/' + campaignId + '/spam.json', 'campaign_spam.json');
    api.campaigns.getSpamComplaints(campaignId, null, function (err, spam) {
      spam.Results.length.should.equal(1);
      spam.Results[0].EmailAddress.should.equal('subs+6576576576@example.com');
      spam.Results[0].ListID.should.equal('512a3bc577a58fdf689c654329b50fa0');
      spam.Results[0].Date.should.equal('2010-10-11 08:29:00');
      spam.ResultsOrderedBy.should.equal('date');
      spam.OrderDirection.should.equal('asc');
      spam.PageNumber.should.equal(1);
      spam.PageSize.should.equal(1000);
      spam.RecordsOnThisPage.should.equal(1);
      spam.TotalNumberOfRecords.should.equal(1);
      spam.NumberOfPages.should.equal(1);
      done();
    });
  });
});