rm dev.sqlite3
./node_modules/.bin/knex migrate:latest --knexfile config/knexfile.js --cwd .
cat <<EOF | sqlite3 dev.sqlite3
.read fixture.sql
.q
EOF
