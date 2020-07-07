let mongoose = require('mongoose')
const history = mongoose.Schema
const history = new history({
    name:String,
    type: String,
    collection:String ,
    marque:String,
    reference:String ,
    image:String ,
    prix:Number,
    quantite:Number,
    couleur:String ,
    useraction:String,
    dateaction:String,
    action:String,
    id: Number,
  })
  module.exports = mongoose.model('history',history,'historys')