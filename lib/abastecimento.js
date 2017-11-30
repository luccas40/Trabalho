import { Mongo } from 'meteor/mongo';
import { Carro } from '/lib/carro';

export const Abastecimento = new Mongo.Collection("abastecimentos", {
	transform:	function(doc){
		doc.carro = function(){
			return Carro.findOne({_id: doc.carroID});
		};
		return doc;		
	}
});

Abastecimento.before.insert(function (userId, doc) {
	var carro = Carro.findOne({_id: doc.carroID});	
	carro.kmAtual = Number(carro.kmAtual);
	carro.kmAtual += carro.kmAPercorrer;
	carro.rodas.km += carro.kmAPercorrer;
	carro.revisao += carro.kmAPercorrer;
	Carro.update(carro._id, {$set:carro});
});


Abastecimento.before.remove(function (userId, doc) {
	var carro = Carro.findOne({_id: doc.carroID});
	carro.kmAtual = Number(carro.kmAtual);
	carro.kmAtual -= doc.litros * carro.kmByLitro;
	carro.rodas.km -= doc.litros * carro.kmByLitro;
	carro.revisao -= doc.litros * carro.kmByLitro;
	Carro.update(carro._id, {$set:carro});
});

$Abastecimento = Abastecimento;