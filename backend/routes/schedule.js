const express = require("express")
const db_funct = require("../database/functions");
const router = express.Router()

const scheduleDB = require("../scripts/scheduleData");


// Models
//const userModel = require("../models/userModel")

router.get("/", async function (req, res) {
	let result = await scheduleDB.schedules();
	res.json(result);
})

router.post('/', async function (req, res) {
	const newSchedule = req.body;
	let result = await scheduleDB.insertSchedule(newSchedule);
	res.json(newSchedule);
});



router.get("/cancer", async function (req, res) {
	let result = await scheduleDB.cancer();
	res.json(result);
})

router.get("/machines", async function (req, res) {
	let result = await scheduleDB.machines();
	res.json(result);
})

router.get("/:id", async function (req, res) {
	const userId = req.params.id;
	let patientId = await scheduleDB.getPatientId(userId);

	let result = await scheduleDB.scheduleForUser(patientId["patient_id"]);
	res.json(result);
})
router.get("/generateSchedule/:id/:duration", async function (req, res) {
	const userId = req.params.id;
	const duration = req.params.duration;

	let patientId = await scheduleDB.getPatientId(userId);

	let result = await scheduleDB.generateSchedule(patientId["patient_id"],duration);
	res.json(result);
})

router.get("/machines/:cancer_id", async function (req, res) {
	const cancerId = req.params.cancer_id;
	let result = await scheduleDB.machinesCancer(cancerId);
	res.json(result);
})

module.exports = router;