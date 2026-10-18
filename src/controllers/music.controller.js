const musicModel = require('../models/music.model.js')
const jwt = require('jsonwebtoken')
const {uploadOnCloudinary} = require('../utils/cloudinary.util.js')



async function createMusic(req, res) {
    try {
        const { title } = req.body
        const file = req.file

        if (!file) {
            return res.status(400).json({
                message: "Music file is required"
            })
        }

        const result = await uploadOnCloudinary(file.path)

        if (!result) {
            return res.status(500).json({
                message: "File upload failed"
            })
        }

        const music = await musicModel.create({
            uri: result.secure_url,
            title,
            artist: req.user.id
        })

        return res.status(201).json({
            message: "Music created successfully",
            music: {
                id: music._id,
                uri: music.uri,
                title: music.title,
                artist: music.artist
            }
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Music creation failed"
        })
    }
}

async function getAllMusic(req,res){
    // const musics = await musicModel.find().populate("artist")
    const musics = await musicModel.find().populate("artist","username email")

    return res.status(200).json({
        message : "All musics fetched successfully",
        musics : musics
    })
}

module.exports = { createMusic,getAllMusic }


