import { Mongo } from 'meteor/mongo';
import { Abastecimentos } from '/imports/collections/abastecimentos';
export const Carros = new Mongo.Collection("carros", {
	transform: function(doc){
		doc.ultimaAbastecida = Abastecimentos.findOne({carroID: doc._id}, {sort: {data: -1}})
		if(doc.ultimaAbastecida == null)
			doc.kmAPercorrer = 0;
		else
			doc.kmAPercorrer = doc.ultimaAbastecida.litros * doc.kmByLitro;

		doc.gastoPorMes = []
		Abastecimentos.find({carroID: doc._id}).forEach(element => {
			if(doc.gastoPorMes.length > 0){
				if(doc.gastoPorMes.some(o => o.data.getMonth() === element.data.getMonth())){
					var index = doc.gastoPorMes.findIndex(o => o.data.getMonth() === element.data.getMonth());
					doc.gastoPorMes[index].qnt += 1;
					doc.gastoPorMes[index].valor += element.valor; 
				}else
					doc.gastoPorMes.push({qnt: 1, data:element.data, valor:element.valor});
			}else
				doc.gastoPorMes.push({qnt: 1, data:element.data, valor:element.valor});
		});
		doc.gastoPorMes.sort(function(a, b){ return new Date(a.data) - new Date(b.data); });
		return doc;
		
	}
});