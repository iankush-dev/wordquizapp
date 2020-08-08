const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wordsCursor = new Schema({
    from_id: { type : String}, 
    to_id:{ type : String},
    type: { 
        type: String, 
        enum : ['NEW', 'WRONG', 'CORRECT'], 
        default: 'NEW' 
        }, 
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('WordsCursor',wordsCursor)