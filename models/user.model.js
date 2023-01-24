const { model, schema, Schema } = require('mongoose');

const userSchema = new Schema({
  username: String,
  email: String,
  password: String
}, {
  timestamps: true
});

module.exports = model('user', userSchema);