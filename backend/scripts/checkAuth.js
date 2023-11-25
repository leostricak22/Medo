const db_funct = require("../database/functions");

module.exports = {
	login: async function (user_name, password) {
		let user_id = 0;

		let sql = "SELECT user_id FROM users WHERE user_name=? AND password=?;";
		let result = (await db_funct.db_select(sql, [user_name, password]))[0];

		if (result)
			user_id = result.user_id;

		return user_id;
	},
	auth: async function (user_id) {
		let access = "denied";

		let sql = "SELECT user_id FROM users WHERE user_id=?;";
		let result = (await db_funct.db_select(sql, [user_id]))[0];

		if (result)
			access = "granted";

		return access
	}
}