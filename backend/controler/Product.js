const Produit = require('../model/produit');


exports.getProduct= async (req,res)=>{
   // res.send("hello")
 try{
  const produit =  await Produit.find().lean()
    
        return res.send({produit : produit });
    
}
catch( error )
{console.error(error)}
}
    exports.PostsProduct=(req,res)=>{
        try{
            let myData = Produit( req.body)
            myData.save()
            res.send("item saved to database");
            
            console.log ( req.body)
            } catch (error) {
              console.error(error.message);
              res.status(500).send("Server Error");
              res.status(400).send("unable to save to database");
            
            }
            }

    exports.DelateProduct=  async( req , res) => {

        try {
            const produit = await Produit.findByIdAndDelete(req.params.id) 
            if (!produit) return res.status(404)
            .send({msg : "non exsiste"})
            res.send({msg : "produit  delated "})
        }
        catch(error){
            res.status(500).send("serveur error")
        }
    
    }

    exports.PutProduct=  async( req , res) => {
        try {
let publication = await Produit.findById(req.params.id);
console.log(publication)
if (!publication)
  return res
    .status(404)
    .send({ msg: "le produit n'est pas trouvez." });
let publication2 = await Produit.findByIdAndUpdate(
  req.params.id,
  req.body
);
res.send(publication2);
        }
    catch(error){
        res.status(500).send("serveur error")
    }
    
    
}
    