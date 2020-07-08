const mongoose = require('mongoose')
let comentaire = require('./comentaire')
const Schema  = mongoose.Schema
const produitSchema = new Schema({
    name:String,
    type : String,
    collct: String,
    marque : String,
    ref: String,
    image: String,
    prix : String,
    quantite: Number,
    couleur:String,
    mesure:String,
    dateajoute: String,
    nombredemodification: Number,
    ok :[comentaire],
    datemodification:String,
})

module.exports = mongoose.model('produit',produitSchema, 'produits')