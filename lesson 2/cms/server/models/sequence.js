/*eslint-env node*/

var mong = require('mongoose');
var Schema = mong.Schema;
var schema = new Schema({
  maxDocumentId: {
    type: String
  },
  maxMessageId: {
    type: String
  },
  maxContactsId: {
    type: String
  },
  maxContactId: {
    type: String
  }
})

module.exports = mong.model('Sequence', schema)
