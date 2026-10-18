const mongoose = require('mongoose')

const albumSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    musics : [{
        type : mongoose.Types.ObjectId,
        ref : "Music"
    }],
    artist : {
        type : mongoose.Types.ObjectId,
        ref : "User",
        required : true
    }

},{timestamps : true})

const albumModel = mongoose.model("album",albumSchema)
module.exports = albumModel