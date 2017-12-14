/*eslint-env node*/

var mong = require('mongoose');
var Schema = mong.Schema;
var schema = new Schema({
  id: {
    type: String,
    required: true
  },
  subject: {
    type: String
  },
  msgText: {
    type: String,
    required: true
  },
  sender: {
    type: String
  }
})

module.exports = mong.model('Message', schema)
