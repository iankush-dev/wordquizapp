const shuffle = require('shuffle-array')

//Create random options by shuffling array
function createOptions(wordsObj, answer) {
  let words = convertIntoCustomObj(wordsObj, answer)
  let key = { word: answer.meanings[0], id: answer._id }
  let createShuffleArr = [words[0], key, words[1]]
  let wordArr = shuffle(createShuffleArr)
 
  return wordArr
}

//Random Integer helper method
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

//Convert to options Obj
function convertIntoCustomObj(wordsObj, answer) {
  let tempArr = []
  wordsObj.forEach(ele => {
    if (!String(ele._id).match(String(answer._id)))
      tempArr.push({ word: ele.meanings[0], id: ele._id })
  });

  return tempArr
}


//Create 20 quiz questions
function createQuiz(wordsObj)
{
  let quizObjs = []
  wordsObj.forEach(ele => {
    let options = createOptions(wordsObj, ele)
    quizObjs.push({question:ele.question, options:options, key:ele._id })
  });

  return quizObjs;
}

module.exports = {createQuiz}