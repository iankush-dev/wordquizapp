const express = require('express')
const mongoose = require('mongoose')
const dburl = 'mongodb+srv://root:mongodb143@cluster0.lnjso.mongodb.net/words?retryWrites=true&w=majority'

const app = express()

mongoose.connect(dburl, {useNewUrlParser:true, useUnifiedTopology: true})
const con = mongoose.connection

con.on('open', () => {
    console.log('connected to Mongo Atlas server...')
})

con.on('error', (err) => {
    console.log("Could not connect to mongo server! : " + err);
})

app.use(express.json())

const wordRouter = require('./routes/words')
app.use('/words',wordRouter)

const PORT = 9000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})