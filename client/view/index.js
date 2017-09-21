import { Template } from 'meteor/templating';


Template.appTemplate.onRendered(function(){
  var me = this;  
  var trigger = me.$('.hamburger'),
      overlay = me.$('.overlay'),
     isClosed = false;

    trigger.click(function () {
      hamburger_cross();      
    });

    function hamburger_cross() {

      if (isClosed == true) {          
        overlay.hide();
        trigger.removeClass('is-open');
        trigger.addClass('is-closed');
        isClosed = false;
      } else {   
        overlay.show();
        trigger.removeClass('is-closed');
        trigger.addClass('is-open');
        isClosed = true;
      }
  }
  
  me.$('[data-toggle="offcanvas"]').click(function () {
        me.$('#wrapper').toggleClass('toggled');
  });    
});