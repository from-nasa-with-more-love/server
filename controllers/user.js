const modelUser = require('../models/user')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)
const { hash, compare } = require('../helpers/bcrypt')
const { sign } = require('../helpers/jwt')

class User {
  static login(req, res) {
    modelUser.findOne({ email: req.body.email })
      .then(found => {
        if (found) {
          if (compare(req.body.password, found.password)) {
            let token = sign({
              _id: found._id,
              name: found.name,
              email: found.email
            })
            res.status(200).json({ token })
          }
        }
      })
      .catch(err => {
        res.status(500).json({ err })
      })
  }

  static register(req, res) {
    let newData = {
      name: req.body.name,
      email: req.body.email,
      password: hash(req.body.password)
    }
    modelUser.create(newData)
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        res.status(500).json({ err })
      })
  }

  static googleLogin(req, res) {
    let payload;
    client.verifyIdToken({
      idToken: req.body.token,
      audience: process.env.CLIENT_ID
    })
      .then(ticket => {
        payload = ticket.getPayload()

        return modelUser.findOne({
          email: payload.email
        })
      })
      .then((foundUser) => {
        if (foundUser) {
          const token = sign({ id: foundUser._id, name: foundUser.name, email: foundUser.email })
          res.status(200).json(token)
        } else {
          let newUser = new modelUser({
            name: payload.name,
            email: payload.email,
            password: hash(payload.email)
          })
          modelUser.create(newUser)
            .then(data => {
              const token = sign({ name: payload.name, email: payload.email })
              res.status(200).json(token)
            })

        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err.message)
      })
  }
}

module.exports = User
