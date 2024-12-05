lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

test-coverage:
	npx jest --coverage