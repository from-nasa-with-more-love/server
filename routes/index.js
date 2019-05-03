const router = require('express').Router()
const user = require('./user')

const nasa = require('./nasa')

router.use('/users', user)

router.use('/nasa', nasa)

module.exports = router
