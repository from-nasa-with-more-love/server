const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userSchema = new Schema({
    name: String,
    email: String,
    password: String
})

let User = mongoose.model("User", userSchema)

module.exports = User