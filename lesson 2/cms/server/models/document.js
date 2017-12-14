/*eslint-env node*/

var mong = require('mongoose');
var Schema = mong.Schema;
var schema = new Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
})

module.exports = mong.model('Document', schema)
