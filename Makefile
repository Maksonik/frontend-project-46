lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

test-coverage:
	npx jest --coverage

test:
	npx jest

install:
	npx install