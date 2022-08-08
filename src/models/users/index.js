const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
});

const UsersModel = mongoose.model('users', UsersSchema);

module.exports = UsersModel;
