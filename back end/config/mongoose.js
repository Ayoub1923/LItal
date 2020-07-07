
const   mongoose = require('mongoose');
const config = require('config')
const db = config.get('mongoURI')


const mangoosdb =() =>  {
  try{
 mongoose.connect(db,
 {useNewUrlParser:true,
   useUnifiedTopology: true})
 console.log("ok")
}
catch (err) {
console.log("non ok", err.message)
}
};
 module.exports = mangoosdb
