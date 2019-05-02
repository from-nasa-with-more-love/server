const router = require('express').Router()
const user = require('./user')

router.use('/users', user)

module.exports = router
