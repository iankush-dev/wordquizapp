const Words = require('../schema/wordsentity')
const WordsCursor = require('../schema/wordcursor')
const HelperUtil = require('../utils/helper')

//Get cursor if present
async function getCursor(type) {
    let cursor = await WordsCursor.findOne({ type: type })
    return (cursor == null) ? [] : [cursor] 
}


async function shuffleWords() {
    let resultSet = []
    let limit = 3
    let cursor = await getCursor('NEW')

    if (cursor.length > 0) {
        resultSet = await paginateFromCondition(cursor[0].to_id, limit)
        if(resultSet.length <=0 )
            return resultSet

        await recordCursor(resultSet[0]._id, resultSet[limit-1]._id, 'NEW')
        return HelperUtil.createQuiz(resultSet);
    }
    else{
        resultSet = await paginateFromStart(limit)
        if(resultSet.length <=0 )
            return resultSet

        await recordCursor(resultSet[0]._id, resultSet[limit-1]._id, 'NEW')
        return HelperUtil.createQuiz(resultSet);
    }
}

//Custom Pagination by Id
async function paginateFromCondition(fromId, nPerPage) {
    let records = await Words.find({ _id: { $gt: fromId } })
        .limit(nPerPage);

    return records;
}

//Pagination from start
async function paginateFromStart(nPerPage) {
    let records = await Words.find().limit(nPerPage);
    return records;
}

//Record cursor data
async function recordCursor(from_id, to_id, type) {
    if(!deleteCursor(type))
        return `Can't delete Cursor object`

    const cursorObj = new WordsCursor({
        from_id: from_id,
        to_id: to_id
    })

    try {
        const newCursorObj = await cursorObj.save()
        return newCursorObj
    } catch (err) {
        return `Error: ${err}`
    }
}

//Delete Cursor data
async function deleteCursor(type){
    let res = false
    await WordsCursor.findOneAndDelete({ type: type }, function (err) {
        res =  (err) ? false : true;
      });
      return res
}


module.exports = { shuffleWords, deleteCursor}