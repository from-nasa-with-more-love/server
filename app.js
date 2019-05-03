require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const route = require('./routes')
const port = 3000

let app = express()

mongoose.connect('mongodb://localhost:27017/from-nasa-with-more-love', { useNewUrlParser: true })
mongoose.connection.on('error', (error) => {
    console.log(error);
    console.log('Please make sure MongoDB is running');
    process.exit();
})
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use('/', route)

app.listen(port, () => {
    console.log(`Listen on ${port}`);
})
