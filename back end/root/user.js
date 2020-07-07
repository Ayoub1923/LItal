const express = require('express')
const {getusers , delateuser,updateuser,posteuser,getuser} =require('../controllers/product')
const router=express.Router()
router.get('/users',getusers)
router.delete   ('/users/:id',deleteuser)
router.put('/users/id',updateuser)
router.post('/users',posteuser)
router.get('/users',getuser)
module.exports=router;
