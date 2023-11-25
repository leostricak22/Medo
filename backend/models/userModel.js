class userModel {
	constructor({user_id, user_name, user_fname, user_email, password, user_type}) {
		this.user_id = user_id;
		this.user_name = user_name;
		this.user_fname = user_fname;
		this.user_email = user_email;
		this.user_password = password;
		this.user_type = user_type;
	}
}

module.exports = userModel;