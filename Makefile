
TESTS = test/*.js
REPORTER = spec
INTEGRATION = integration/*.js

docs: clean-docs
	@./node_modules/.bin/codex build docs \
		--out docs/out
	@./node_modules/.bin/codex serve \
		--out docs/out --static /createsend

clean-docs:
	@rm -rf docs/out

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		--timeout 10000 \
		$(TESTS)
integration:
	@NODE_ENV=integration ./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		--timeout 10000 \
		$(INTEGRATION)

lib-cov:
	jscoverage lib lib-cov

test-cov:	lib-cov
	@CREATESEND_NODE_COV=1 $(MAKE) test REPORTER=html-cov > coverage.html
	rm -rf lib-cov

test-coveralls:	lib-cov
	echo TRAVIS_JOB_ID $(TRAVIS_JOB_ID)
	@CREATESEND_NODE_COV=1 $(MAKE) test REPORTER=mocha-lcov-reporter | ./node_modules/coveralls/bin/coveralls.js
	rm -rf lib-cov

.PHONY: clean-docs docs test integration
