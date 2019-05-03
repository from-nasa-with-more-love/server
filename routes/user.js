const router = require('express').Router()
const userController = require('../controllers/user')

router.post('/login', userController.login)
router.post('/register', userController.register)
router.post('/googleLogin', userController.googleLogin)

module.exports = router