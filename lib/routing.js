Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function(){
		console.log('carregando dados');
		return [
			Meteor.subscribe('carros'),
			Meteor.subscribe('abastecimentos'),
			Meteor.subscribe('corridas')
		]
	}
});

Router.onBeforeAction(function(){
	if (!Meteor.user() && this.ready){
		this.layout('loginTemplate');
		return this.render('formulario', {to: 'conteudo'});
	}else{
		this.next();
	}	
}, {except: ['/', 'register']});

Router.route('/', function(){
	if(Meteor.userId()){
		this.redirect('/app/dashboard');
	}else{
		this.layout('loginTemplate');
		this.render('formulario', {to: 'conteudo'}); 
	}
});

Router.route('/register', function(){
	this.layout('loginTemplate');
	this.render('cadastro', {to: 'conteudo'});	
});

Router.route('/app/dashboard', function(){
	this.render('dashboard', {to: 'conteudo'});
});

Router.route('/app/carros', function(){
	this.render('meusCarros', {to: 'conteudo'});
});

Router.route('/app/despesas', function(){
	this.render('despesas', {to: 'conteudo'});
});

Router.route('/app/abastecimentos', function(){
	this.render('abastecimento', {to: 'conteudo'});
});

Router.route('/app/eventos', function(){
	this.render('eventos', {to: 'conteudo'});
});



Router.route('/app/sair', function(){
	Meteor.logout();
	this.redirect('/');	
});


