
let mongoose = require('mongoose')
const session = mongoose.Schema
const session = new session({

  
    first_name:String ,
    last_name:String  ,
    email:String  ,
    password:String  ,
    image:String  ,
    role:String  ,
    posteOcuper: String ,
    id: Number,
  })
  module.exports = mongoose.model('session',session,'Session')