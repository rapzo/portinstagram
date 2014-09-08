var db = require("lib/database")(process.ENV || 'development')
var bookshelf = require('bookshelf')(db)

module.exports = bookshelf.Model.extend({})
