/**
 * Created by xc- on 16.10.2016.
 */
const mongoose = require('mongoose');

const tokenSchema = mongoose.Schema({
  token: {
    type: String, unique: true, required: true
  },
  userId: {
    type: String, required: true
  },
  createdAt: {
    type: Date, expires: 60*60, default: Date.now()
  }
});

module.exports = mongoose.model('CentralAuthToken', tokenSchema);
