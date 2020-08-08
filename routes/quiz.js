const express = require('express')
//const { Validator } = require('node-input-validator')
const router = express.Router()
const QuizImpl = require('../impl/quizimpl')

router.get('/get-ques', async (req, res) => {
    try {
        const resultset = await QuizImpl.shuffleWords()
        res.json(resultset)
    } catch (err) {
        res.send('Error ' + err)
    }
})

router.delete('/clear-cursor', async (req, res) => {
    try {
        const resultset = await QuizImpl.deleteCursor('NEW')
        res.json(resultset)
    } catch (err) {
        res.send('Error ' + err)
    }
})

module.exports = router