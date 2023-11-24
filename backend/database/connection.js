const mysql = require('mysql2');
require('dotenv').config();

var dbConfig = {
	connectionLimit: 100,
	queueLimit: 100,
	host: process.env.DBHOST,
	user: process.env.DBUSER,
	password: process.env.DBPASSWORD,
	database: process.env.DATABASE,
	port: process.env.DBPORT
};

function handle_connection() {
	try {
		connection = mysql.createConnection(dbConfig)
		connection.on('connect', async function() {
			try {
				setTimeout(connection.end(), 1000);
			} catch {
			}
		})

		connection.on('end', function() {
		})

		connection.on('error', function onError(err) {
			handle_connection();
		});

		return connection;
	} catch {
		return false;
	}
}

module.exports.handle_connection = handle_connection;