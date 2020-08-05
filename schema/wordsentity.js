const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wordsSchema = new Schema({
    question: { type : String}, 
    word:{ type : String},
    meanings: [String],
    list: { 
        type: String, 
        enum : ['WORDL1', 'WORDL2'], 
        default: 'WORDL1' 
        }, 
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Words',wordsSchema)