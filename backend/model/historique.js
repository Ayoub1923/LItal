const mongoose = require('mongoose')

const schema  = mongoose.Schema
const historiqueSchema = new schema({
    
    id : { type: String },
    name:String,
    type: String,
    collct : String,
    marque: String,
    ref: String,
    image : String,
    prix: String,
    quantite: String,
    couleur:String,
    useraction : String,
    dateaction : String,
    action : String,

})

module.exports = mongoose.model('historique',historiqueSchema, 'historiques')