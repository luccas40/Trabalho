import { Mongo } from 'meteor/mongo';
export const Evento = new Mongo.Collection("eventos", {
	transform:	function(doc){
		doc.carro = function(){
			return $Carro.findOne({_id: doc.carro});
		};
		return doc;		
	}
});

$Evento = Evento;