const Historique = require('../model/historique')
exports.gethistorique =  async( req , res) => {

    try {
    const historique  = await Historique.find()
    
    return res.send(historique)
    }
    catch {
    
        res.status(500).send("error serveur")
    }
    
    }

    exports.posthystorique =  async( req , res) => {
        try{
            let myData = Historique( req.body)
            myData.save()
            res.send("item saved to database");
            
            console.log ( req.body)
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Server Error");
                res.status(400).send("unable to save to database");
    }

}