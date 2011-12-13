
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
