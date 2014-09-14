// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    }
    ,
    debug: true
  },

  staging: {
    client: 'sqlite3',
    connection: {
      filename: './test.sqlite3'
    }
  },

  production: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    }
  }

};
