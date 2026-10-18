
    const albumModel = require('../models/album.model.js');
    const jwt = require('jsonwebtoken');

    async function createAlbum(req, res) {
        const { title, musics } = req.body;

            const album = await albumModel.create({
                title,
                musics,
                artist: req.user.id
            });

            return res.status(201).json({
                message: "Album created successfully",
                album: {
                    id: album._id,
                    title: album.title,
                    artist: album.artist,
                    musics: album.musics
                }
            });

    } 

    async function getAllAlbums(req,res){
        const albums = await albumModel.find().populate("title artist").populate("artist","username email")



        return res.status(200).json({
            message : "All albums fetched successfully",
            albums : albums
        })

    }

    async function getAlbumById(req,res){
        const albumId = req.params.albumId

        const album = await albumModel.findById(albumId).populate("artist")
    }


    module.exports = { createAlbum,getAllAlbums };
