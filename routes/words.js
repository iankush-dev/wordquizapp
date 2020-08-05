const express = require('express')
const { Validator } = require('node-input-validator')
const router = express.Router()
const Words = require('../schema/wordsentity')
const WordImpl = require('../impl/wordimpl')

router.get('/get-all', async (req, res) => {
    try {
        const allWords = await Words.find()
        res.json(allWords)
    } catch (err) {
        res.send('Error ' + err)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const allWords = await WordImpl.getById(req.params.id)
        res.json(allWords)
    } catch (err) {
        res.send('Error ' + err)
    }
})

router.post('/create-new', async (req, res) => {

    const v = new Validator(req.body, {
        question: 'required',
        word: 'required',
        meanings: 'required|array'
    });

    v.check().then(async (matched) => {
        if (!matched) {
            res.status(422).send(v.errors);
        }
        else {
            let response = await WordImpl.saveEntity(req)
            res.json(response)
        }
    });


})

module.exports = router