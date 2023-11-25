const express = require("express")
const db_funct = require("../database/functions");
const router = express.Router()

// Models
const userModel = require("../models/userModel")

router.get("/", async function(req, res){
	res.send("Reservation");
})

module.exports = router;