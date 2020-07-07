var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const product = new Schema ({

    name:String,
    type:String,
 
    marque:String,
    reference:String,
    image:String,
     prix:Number ,
    quantite:Number,
    couleur:String,
    dateajoute:String,
    nombredemodification:Number,
    ok:Array,
    id:Number, 
    datemodification:String,

})
module.exports = mongoose.model('product',product,'Products')