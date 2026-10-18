const express = require('express')
const upload = require('../middlewares/multer.middleware.js')
const { createMusic, getAllMusic } = require('../controllers/music.controller.js')
const { authArtist, authUser } = require('../middlewares/auth.middleware.js')

const router = express.Router()

router.post('/create', authArtist ,upload.single('music'), createMusic)

router.get('/getMusic', authUser ,getAllMusic)

module.exports = router  