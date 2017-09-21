import './login.html';


Template.formulario.events({
	'submit #login'(e){
		e.preventDefault();
		
		/*const conta = [{
		  email: 'admin@admin',
		  password: 'senha'
		}];
		
		Meteor.call('conta.insert', conta);*/
		
		Meteor.loginWithPassword(e.target.user.value, e.target.senha.value, function(error){
			if(error){ alert("senha incorreta"); }
			else{ Router.go('/app/home'); }			
		});		
	}
});
