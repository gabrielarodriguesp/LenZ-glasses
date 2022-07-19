const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

app.use(
  cors(),
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const examRoutes = require('./routes/examRoutes')

app.use('/product', productRoutes)
app.use('/user', userRoutes)
app.use('/exam', examRoutes)

const mongoUR = 'mongodb+srv://projetoWEB:5ouOZ6Qm4urNokYE@cluster0.kcm0o.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(
  mongoUR,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }
)

app.listen(5000)