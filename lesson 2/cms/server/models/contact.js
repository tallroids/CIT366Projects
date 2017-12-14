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
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  imageUrl: {
    type: String
  },
  group: [{
    type: Schema.Types.ObjectId,
    ref: 'Contact'
  }]
})

module.exports = mong.model('Contact', schema)
