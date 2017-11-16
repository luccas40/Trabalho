import { Mongo } from 'meteor/mongo';
import { Abastecimentos } from '/imports/collections/abastecimentos';
export const Carros = new Mongo.Collection("carros", {
	transform:	function(doc){
		var valor = 0;
		Abastecimentos.find({carroID: doc._id}).forEach(function(item){
			valor += item.valor;
		});
		doc.totalGasto = valor;
		doc.gastoPorMes = 0;
		doc.ultimaAbastecida = Abastecimentos.findOne({carroID: doc._id}, {sort: {data: -1}})
		if(doc.ultimaAbastecida == null)
			doc.kmAPercorrer = 0;
		else
			doc.kmAPercorrer = doc.ultimaAbastecida.litros * doc.kmByLitro;
		return doc;
		
	}
});