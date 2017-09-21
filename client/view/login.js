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
			else{
				Router.go('/app/home'); 
			}			
		});		
	}
});


Template.cadastro.events({
	'submit #cadastro'(e){
		e.preventDefault();
		
		const conta = [{
			email: e.target.mail.value,
			username: e.target.user.value,
			password: e.target.senha.value,
			profile: {
				first: e.target.nome.value
			}
		}];
		
		Meteor.call('conta.insert', conta, function(err, result){
			if(err){
				swal("Oops" ,  "Algo deu errado!" ,  "error");
			}else{
				swal("Perfeito" ,  "Conta criada com sucesso!" ,  "success").then(function(){
					Meteor.loginWithPassword(e.target.user.value, e.target.senha.value, function(error){
						if(error){ swal("Oops" ,  "Algo deu errado ao entrar em cena!" ,  "error"); }
						else{ 
							Router.go('/app/home');
						}			
					});
				});
			}			
		});
		
	}
});
