const express = require("express")
const router = express.Router()

// Models
const loginModel = require("../models/loginModel")

// Scripts
const db_funct = require("../database/functions");
const checkAuth = require("../scripts/checkAuth");

router.post("/login", async (req,res) => {
	let loginInfo = new loginModel({
		user_name: req.body.username,
		password: req.body.password
	});

	res.json({"cookie": await checkAuth.login(loginInfo.user_name, loginInfo.password)});
})

router.post("/auth", async (req,res) => {
	let user_id = req.body.cookie

	res.json({"access": await checkAuth.auth(user_id)});
})

module.exports = router;