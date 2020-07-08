const express = require("express");
const router = express.Router();
const Produit = require('../model/produit')
router.get ('ListeProduit', async( req , res) => {
    res.send("bonjour produit")
const listeproduit = Produit.find()
return res.send({produit : listeproduit })


})

router.post('/ListeProduit', async(req , res) => {
    var myData = new Produit(req.body);
    myData.save()
    .then(item => {
    res.send("item saved to database");
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });

})

router.put('/ListeProduit/:id', async( req , res) => {
    try {
    const produit =  Produit.findByIdAndUpdate(req.params.id)
    if (!produit) return res.status(404)
.send( {produit : "user non existe"})
res.send({msg :"utuisateur modifier"})
    }
catch(error){
    res.status(500).send("serveur error")
}
})


router.delete('/ListeProduit/:id',async( req , res) => {

    try {
        const produit = await Produit.findByIdAndDelete(req.params.id) 
        if (!produit) return res.status(404)
        .send({msg : "non exsiste"})
        res.send({msg : "produit  delated "})
    }
    catch(error){
        res.status(500).send("serveur error")
    }

})

module.exports = router;
