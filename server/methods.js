import { check } from 'meteor/check';

Meteor.methods(
	{'conta.insert'(users){
		check(users, [{
			email: String,
			username: String,
			password: String,
			profile: {
				first: String
			}
		}]);
		
		users.forEach(({ name, email, username, password }) => {
			const mailExists = Accounts.findUserByEmail(email);
			const userExists = Accounts.findUserByUsername(username);
			if (!userExists) {
				Accounts.createUser({ name, email, username, password });				
			}
		});
	
	}
});