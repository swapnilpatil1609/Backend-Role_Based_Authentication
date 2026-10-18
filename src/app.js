const cookieParser = require('cookie-parser');
const express = require('express')
const authRoutes = require('./routes/auth.route.js')
const musicRoutes = require('./routes/./music.route.js')
const albumRoutes = require('./routes/album.route.js')

const app = express()
app.use(express.json());
app.use(cookieParser())

app.use('/api/auth',authRoutes)
app.use('/api/music',musicRoutes)
app.use('/api/album',albumRoutes)

module.exports = app