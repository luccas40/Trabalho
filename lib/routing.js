Router.configure({
	layoutTemplate: 'appTemplate'
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
		this.redirect('/app/home');
	}else{
		this.layout('loginTemplate');
		this.render('formulario', {to: 'conteudo'}); 
	}
});

Router.route('/register', function(){
	this.layout('loginTemplate');
	this.render('cadastro', {to: 'conteudo'});	
});

Router.route('/app/home', function(){
	this.render('home', {to: 'conteudo'});
});

Router.route('/app/carros', function(){
	this.render('meusCarros', {to: 'conteudo'});
});



Router.route('/app/sair', function(){
	Meteor.logout();
	this.redirect('/');	
});


