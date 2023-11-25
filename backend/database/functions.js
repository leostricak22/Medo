const database = require('./connection');

module.exports = {
	db_select: async function(sql,data){
		connection = database.handle_connection()
		if(connection){
			return new Promise((resolve, reject) => {
				connection.query(sql, data, (err, result) => {
					if (err) resolve([]);
					else resolve(result);
				});
			});
		} else {
			return {}
		}
	}
};