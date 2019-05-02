const User = require('../models/user')
const { verify } = require('../helpers/jwt.js')

function authentication(req, res, next) {
  let decoded = verify(req.headers.token);
  User.findOne({ email: decoded.email })
    .then(userFound => {
      if (userFound) {
        req.decoded = userFound._id
        next()
      } else {
        res.status(401).json({ message: 'Unauthorized' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Internal Server Error' })
    })
}

module.exports = authentication
