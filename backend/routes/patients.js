const express = require("express")
const db_funct = require("../database/functions");
const router = express.Router()

const scheduleDB = require("../scripts/scheduleData");


// Models
//const userModel = require("../models/userModel")

router.get("/", async function(req, res){
	let result=await scheduleDB.patients();
    res.json(result);
})


// Create a new patient
router.post('/', async function (req, res) {
	const newPatient =  req.body;
	console.log(newPatient);

	let result=await scheduleDB.insertPatient(newPatient);
    res.json(result);

  });



module.exports = router;