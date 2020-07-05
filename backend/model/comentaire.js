const mongoose = require('mongoose')

const Schema  = mongoose.Schema
const comentaire = new Schema ({

    text: String,
    date:String,
    user: String,
    role: String

})

module.exports = comentaire