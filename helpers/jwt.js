const jwt = require('jsonwebtoken')

module.exports = {
  sign(payload) {
    return jwt.sign(payload, process.env.SECRET_JWT)
  },
  verify(token) {
    if (token) {
      return jwt.verify(token, process.env.SECRET_JWT)
    }
  }
}