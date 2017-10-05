import { Carros } from '/imports/collections/carros';
import { Abastecimentos } from '/imports/collections/abastecimentos';

Template.registerHelper( 'equals', ( a1, a2 ) => {
  return a1 === a2;
});

Template.registerHelper('formatDate', function(timestamp) {
     return new Date(timestamp).toLocaleDateString("pt-BR");
});

Template.registerHelper('meusVeiculos', () => {
	Meteor.subscribe('abastecimento.findByUser');
	Meteor.subscribe('carro.findByUser');
    return Carros.find();	
});

Template.registerHelper('meusAbastecimentos', () => {
	Meteor.subscribe('abastecimento.findByUser');
    return Abastecimentos.find();	
});