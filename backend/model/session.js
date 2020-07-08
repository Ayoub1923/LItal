const mongoose = require('mongoose')
const Schema  = mongoose.Schema
const Session = new Schema({
    id : { type: String },
    posteOcuper : {type : String,required: true},
    role : {type : String,required: true},
    image : String,
    password:{type : String,required: true} ,
    email : {type : String,required: true},
    last_name: String,
    first_name: String,
})
module.exports = mongoose.model('session',Session, 'sessions')
