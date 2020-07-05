const express = require("express");
const {gethistorique , posthystorique} = require('../controler/historique')

const router=express.Router()
router.get('/Allhistorique',gethistorique)
router.post('/historique',posthystorique)

module.exports = router