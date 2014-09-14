rm dev.sqlite3
./node_modules/.bin/knex migrate:latest --knexfile config/knexfile.js --cwd .
