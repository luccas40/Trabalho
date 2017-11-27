import { Template } from 'meteor/templating';

Template.layout.onRendered(function(){
	var me = this;
	var trigger = me.$('.hamburger'),
		overlay = me.$('.overlay'); 

	trigger.click(function () {
		hamburger_cross();      
	});   	

	me.$('[data-toggle="offcanvas"]').click(function () {
		me.$('#wrapper').toggleClass('toggled');
	});    

	function hamburger_cross() {
		if (trigger.hasClass('is-open')) {          
			overlay.hide();
			trigger.removeClass('is-open');
			trigger.addClass('is-closed');
		} else {   
			overlay.show();
			trigger.removeClass('is-closed');
			trigger.addClass('is-open');
		}
	}
	
	me.$('#links a').click(function () {
		me.$('#wrapper').toggleClass('toggled');
		hamburger_cross();      
	});     
});



