import { Mongo } from 'meteor/mongo';
import { Carros } from '/imports/collections/carros';
export const Corridas = new Mongo.Collection("corridas", {
	transform:	function(doc){
		doc.carro = Carros.findOne({_id: doc.carroID});
		return doc;
		
	}
});

