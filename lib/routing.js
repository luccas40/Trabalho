Router.configure({
	layoutTemplate: 'appTemplate'
});

Router.route('/', function(){
	if(Meteor.userId()){
		this.redirect('/app/home');
	}else{this.render('formulario', {to: 'conteudo'}); }
});

Router.route('/app/home', function(){
	if(! Meteor.userId()){
		this.redirect('/');
	}else{
		this.render('home', {to: 'conteudo'});
	}
});
