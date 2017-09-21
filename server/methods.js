import { check } from 'meteor/check';

Meteor.methods(
	{'conta.insert'(users){
		check(users, [{
			email: String,
			password: String			
		}]);
		
		users.forEach(({ email, password }) => {
			const userExists = Accounts.findUserByEmail(email);

			if (!userExists) {
				Accounts.createUser({ email, password });
				
			}
		});
	
	}
});