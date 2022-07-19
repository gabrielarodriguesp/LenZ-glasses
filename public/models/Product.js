const mongoose = require('mongoose')

const Product = mongoose.model('Product', {
  name: String,
  amount: Number,
  price: Number,
  category: String,
  warranty: Number,
  gender: String,
  description: Object,
  imgs: Array,
})

module.exports = Product