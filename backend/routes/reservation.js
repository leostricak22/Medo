const express = require("express")
const db_funct = require("../database/functions");

const router = express.Router()

router.get("/", async function(req, res){
	let sql = "SELECT 1;"
	let result = (await db_funct.db_select(sql))

	console.log(result)

	res.send("Reservation");
})

module.exports = router;