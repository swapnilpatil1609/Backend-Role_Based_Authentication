const express = require('express')
const { createAlbum, getAllAlbums } = require('../controllers/album.controller')
const { authArtist, authUser } = require('../middlewares/auth.middleware')

const router = express.Router()

router.post('/createAlbum',authArtist, createAlbum)

router.get('/getAllAlbum', authUser ,getAllAlbums)
router.get('/getAlbum/albumId',authUser,getAlbumById)

module.exports = router