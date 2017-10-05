import { Carros } from '/imports/collections/carros';


Template.registerHelper( 'equals', ( a1, a2 ) => {
  return a1 === a2;
});

Template.registerHelper('formatDate', function(timestamp) {
     return new Date(timestamp).toLocaleDateString("pt-BR");
});


Template.registerHelper( 'authors', () => {
  let authors = Authors.find();
  
  if ( authors ) {
    return authors;
  }
});

Template.registerHelper('meusVeiculos', () => {
	Meteor.subscribe('carro.findByUser');
    return Carros.find();	
});