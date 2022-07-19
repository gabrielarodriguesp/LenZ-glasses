const mongoose = require('mongoose')

const User = mongoose.model('User', {
  email: String,
  password: String,
  admin: Boolean,
  orders: Array,
  info: Object,
  exam: Array,  

})

module.exports = User