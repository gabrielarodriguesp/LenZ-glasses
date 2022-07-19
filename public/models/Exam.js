const mongoose = require('mongoose')

const Exam = mongoose.model('Exam', {
  date: String,
  time: Object
})

module.exports = Exam