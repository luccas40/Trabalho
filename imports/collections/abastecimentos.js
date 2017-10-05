import { Mongo } from 'meteor/mongo';
import { Carros } from '/imports/collections/carros';
export const Abastecimentos = new Mongo.Collection("abastecimentos", {
	transform:	function(doc){
		doc.carro = function(){
			return Carros.findOne({_id: doc.carroID});
		}
		return doc;		
	}
});


