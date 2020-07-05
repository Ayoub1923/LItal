const mongoose = require('mongoose')

const Schema  = mongoose.Schema
const userSchema = new Schema({
    id : { type: String },
    first_name: String,
    last_name: String,
    posteOcuper : {type : String,required: true},
    role : {type : String,required: true},
    image : String,
    password:{type : String,required: true} ,
    email : {type : String,required: true},
    
    
})

module.exports = mongoose.model('user',userSchema, 'users')