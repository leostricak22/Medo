const database = require('./connection');

module.exports = {
	db_select: async function(sql,data){
		connection = database.handle_connection() // Vspostava konekcije
		if(connection){
			return new Promise((resolve, reject) => { // Vraćanje Promise objekta
				connection.query(sql, data, (err, result) => {
					if (err) reject(err); // Došlo je do pogreške
					else resolve(result); // Vraćanje rezultata
				});
			});
		} else {
			return {}
		}
	}
};