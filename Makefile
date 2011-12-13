
TESTS = test/*.js
REPORTER = dot

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

.PHONY: clean-docs docs test