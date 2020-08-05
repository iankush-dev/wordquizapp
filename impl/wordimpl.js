const Words = require('../schema/wordsentity')

function getById(id) {
    let allWords = Words.findById(id)
    return allWords
}

async function saveEntity(req) {

    const wordObj = new Words({
        question: req.body.question,
        word: req.body.word,
        meanings: req.body.meanings
    })

    try {
        const newWordObj = await wordObj.save()
        return newWordObj
    } catch (err) {
        return `Error: ${err}`
    }
}

module.exports = { getById, saveEntity }