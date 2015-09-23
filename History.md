0.8.2 / 2015-09-22
==================

  * Ignore credentials.js

0.8.1 / 2015-09-22
==================

  * Updated version in createsend.js

0.8.0 / 2015-09-22
==================

  * Added Transactional

0.7.3 / 2014-09-19
==================

  * Fixed up lib/interface/person.js and removed some compiler errors
  * Fixed up lib/interface/client.js and removed some compiler errors

0.7.2 / 2014-06-20
==================

  * Updated Client.addPerson to return a Person object as the callback result
  * Started documentation for Client
  * Locked Express to version 3.8.* until I can get Mocha working with it
  * Removed support for Node 0.8 and 0.9
  * Changed account.getBillingDetails to return "credits" rather than "Credits"

0.6.1 / 2013-06-12
==================

  * Added full support for Campaigns

0.6.0 / 2013-06-12
==================

  * Added full support for Accounts
  * Added partial support for Campaigns

0.1.0 / 2013-05-30
==================

  * complete rewrite

0.0.2 / 2011-12-13
==================

  * [docs] updated for 0.0.2 (subscribers)
  * [tests] all tests for subscribers interface passing
  * [feature] #subscriberUnsubscribe / #subscriberDelete
  * [feature] #subscriberHistory
  * [feature] #subscriberDetails
  * [feature] #subscribersImport / #subscribersUpdate
  * [feature] #subscriberAdd
  * [bug] #execute don't try to parse empty body
  * [refactor] #execute now requires a querystring object or null
  * [feature] listCreate & listDelete
  * [tests] upped the timeout just in case
  * [docs] added docs site
  * [git] ignore stupid ds-store
  * [docs] prepare package and readme for docs site
  * [npm] added npm ignore

0.0.1 / 2011-12-13
==================

  * [tests] for subscribers interface
  * [docs] comments for subscribersAdd
  * [bug] added 201 as acceptable status code in #execute
  * [tests] added tests for account
  * [refactor] moved #clientsList to account (per cm docs)
  * [feature] finished account implementation
  * [docs] readme update with roadmap and testing instructions
  * [tests] `make test` now in makefile
  * [tests] added sample test data
  * [feature] basic request interface + empty interfaces
  * [init] project
