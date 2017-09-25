import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods(
	{'conta.insert'(conta){
		check(conta, {
			email: String,
			username: String,
			password: String,
			profile: {
				firstName: String
			}
		});
		const mailExists = Accounts.findUserByEmail(conta.email);
		const userExists = Accounts.findUserByUsername(conta.username);
		if (!userExists && !mailExists) {
			Accounts.createUser(conta);				
		}else{
			throw new Meteor.Error('bad', 'email ou usuario ja existe');
		}	
	}
});