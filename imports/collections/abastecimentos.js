import { Mongo } from 'meteor/mongo';
import { Carros } from '/imports/collections/carros';
export const Abastecimentos = new Mongo.Collection("abastecimentos", {
	transform:	function(doc){
		doc.carro = function(){
			return Carros.findOne({_id: doc.carroID});
		};
		return doc;		
	}
});

Abastecimentos.before.insert(function (userId, doc) {
    var carro = Carros.findOne({_id: doc.carroID});
	carro.kmAtual += carro.kmAPercorrer;
	carro.rodas.km += carro.kmAPercorrer;
	carro.revisao += carro.kmAPercorrer;
	Carros.update(carro._id, {$set:carro});
});


Abastecimentos.before.remove(function (userId, doc) {
    var carro = Carros.findOne({_id: doc.carroID});
	carro.kmAtual -= doc.litros * carro.kmByLitro;
	carro.rodas.km -= doc.litros * carro.kmByLitro;
	carro.revisao -= doc.litros * carro.kmByLitro;
	Carros.update(carro._id, {$set:carro});
});