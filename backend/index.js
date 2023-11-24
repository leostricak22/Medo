const express = require("express")
const body_parser = require('body-parser')

require('dotenv').config();

const app = express()
const PORT = process.env.PORT || 5000;

app.set("view engine", "ejs");
app.use(body_parser.urlencoded({ extended: false }))
app.use(body_parser.json());

const reservation_route = require("./routes/reservation")
app.use("/reservation", reservation_route)

app.listen(PORT)