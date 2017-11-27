import { Mongo } from 'meteor/mongo';
import { Carro } from '/lib/carro';
export const Corrida = new Mongo.Collection("corridas", {
	transform:	function(doc){
		doc.carro = Carro.findOne({_id: doc.carroID});
		return doc;
		
	}
});

$Corrida = Corrida;