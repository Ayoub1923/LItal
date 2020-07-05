const express = require("express");
var bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../model/user')
router.get ('/users', async(req, res) => {
try{ const users = await User.find()
   let x =  res.status(200).send(users)
   console.log(x)
return x 


}
catch (error) {
    res.status(500).send("error serveur")
    res.status(404).send('Page Not found');
}
})
router.post("/addnewuser",  (req, res, next) =>  {

  try{
    bcrypt.hash(req.body.password, 10, function (err,   hash) {
    let obj = {
    email :  req.body.email ,
    password : hash,
    posteOcuper: req.body.posteOcuper,
    role:req.body.role ,
    image:req.body.image,
    last_name: req.body.last_name,
    first_name: req.body.first_name
    }
   let myData = User(obj)
   myData.save()
   res.send("item saved to database");
   
   console.log (obj.email , obj.password)
  })
   } 
   catch (error) {
     console.error(error.message);
     res.status(500).send("Server Error");
     res.status(400).send("unable to save to database");
   
   }
   })
router.delete('/delateuser/:id' , async(req , res)=> {
  try {
    const user = await User.findByIdAndDelete(req.params.id) 
    if (!user) return res.status(404)
    .send({msg : "non exsiste"})
    res.send({msg : "user  delated "})
}
catch(error){
    res.status(500).send("serveur error")
}

})
router.patch('/user/:id', async(req, res)=> {
    try{
      console.log(req.params.id, req.body.obj)
    const user = await User.findByIdAndUpdate(req.params.id, req.body.obj)
    if (!user) return res.status(404)
    .send( {msg : "user non existe"})
    res.send({msg :"utuisateur modifier"})
    }
    catch(error){
        res.status(500).send("serveur error")
    }
})
router.post("/login", async (req, res) => {
    let email =  req.body.email
    let password =  req.body.password
    try {
      const user = await User.findOne({ email: email }).lean()
      console.log ("userlogin", Object.values(user).length)
      if (Object.values(user).length <0)
      res.send({msg : "etulisateur n'existe pas"})
     let compare = bcrypt.compareSync( password, user.password)
        if (compare  ||password ===user.password )
        {
        res.send({user : user });
        res.json({msg : "user exist"})
        
        }
    // if ( == )
      else
      res.send({msg : "user ou mot de passe invalide"})
    } 
    catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  });
  
module.exports = router;