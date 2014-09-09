TESTS = test/**/*.coffee
REPORTER = spec
TO = 2000
NODE_OPTS = NODE_ENV=test NODE_PATH=.
MOCHA = ./node_modules/.bin/mocha
COMPILERS = coffee:coffee-script/register
BOOTSTRAP = ./test/bootstrap.coffee

all: test

test:
	$(NODE_OPTS) $(MOCHA) \
		--compilers $(COMPILERS) \
		--require $(BOOTSTRAP) \
		--timeout $(TO) \
		--growl \
		$(TESTS)

.PHONY: test
