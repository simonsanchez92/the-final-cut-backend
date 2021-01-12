const mongoose = require('mongoose');


const MovieSchema = new mongoose.Schema({
 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type: String
    },
    average:{
        type: Number
    },
    release:{
        type: String
    },
    language: {
        type: String
    },
    overview: {
        type: String
    },
    poster_path:{
        type: String
    },
    original_id:{
        type: Number
    }

});

module.exports = Movie = mongoose.model('movie', MovieSchema);