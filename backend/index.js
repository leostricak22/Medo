const express = require("express")
const body_parser = require('body-parser')
const cors = require('cors');

require('dotenv').config();

const app = express()
const PORT = process.env.PORT || 5000;

app.use(cors());

app.set("view engine", "ejs");
app.use(body_parser.urlencoded({ extended: false }))
app.use(body_parser.json());


const reservation_route = require("./routes/reservation")
const authentication_route = require("./routes/authentication")
const schedule_route = require("./routes/schedule")
const patients_route = require("./routes/patients")

app.use("/reservation", reservation_route)
app.use("/authentication", authentication_route)
app.use("/schedule", schedule_route)
app.use("/patients", patients_route)

app.listen(PORT)