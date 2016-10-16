/**
 * Created by xc- on 16.10.2016.
 */
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  userId: {
    type: String, unique: true, required: true
  },
  name: {
    first: String,
    last: String,
    others: [String]
  },
  email: String,
  username: String,
  password: String,
  extended: Object
});

module.exports = mongoose.model('CentralAuthUser', userSchema);
