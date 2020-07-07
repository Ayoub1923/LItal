let mongoose = require('mongoose')
const schema = mongoose.Schema
const user = new schema({

    first_name: String,
    last_name: String,
    email: String,
    password:String,
    image: String,
    role: String,
    posteOcuper:String,
    id: Number,

})
module.exports = mongoose.model('users',user,'Users')