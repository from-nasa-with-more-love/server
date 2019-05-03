const express = require('express');
const router = express.Router();
const Nasa = require('../middleware/nasa');
const Vision = require('../middleware/vision');
const Translate = require('../middleware/translate');
const Youtube = require('../middleware/youtube');


router.post('/', Nasa.getApod, Youtube.getThumbnail, Vision.getTags, Translate.getLangs);


module.exports = router;