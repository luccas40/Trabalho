Template.formulario.events({
	'submit #login'(e){
		e.preventDefault();
		Meteor.loginWithPassword(e.target.user.value, e.target.senha.value, function(error){
			if(error){ alert("senha incorreta"); }
			else{
				Router.go('/app/dashboard'); 
			}			
		});		
	}
});


Template.cadastro.events({
	'submit #cadastro'(e){
		e.preventDefault();
		
		const conta = {
			email: e.target.mail.value,
			username: e.target.user.value,
			password: e.target.senha.value,
			profile: {
				firstName: e.target.nome.value
			}
		};
		
		Meteor.call('conta.insert', conta, function(err, result){
			if(err){
				swal("Oops" ,  "Algo deu errado! "+err ,  "error");
			}else{
				swal("Perfeito" ,  "Conta criada com sucesso!" ,  "success");
				Meteor.loginWithPassword(e.target.user.value, e.target.senha.value, function(){ Router.go('/app/dashboard'); });		
			}			
		});
		
	}
});
