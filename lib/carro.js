import { Mongo } from 'meteor/mongo';
import { Abastecimento } from '/lib/abastecimento';

export const Carro = new Mongo.Collection("carros", {
	transform: function(doc){
		var dataAtual = new Date();
		doc.ultimaAbastecida = Abastecimento.findOne({carroID: doc._id}, {sort: {data: -1}})
		if(doc.ultimaAbastecida == null)
			doc.kmAPercorrer = 0;
		else
			doc.kmAPercorrer = doc.ultimaAbastecida.litros * doc.kmByLitro;

		doc.gastoPorMes = []
		let config = {carroID: doc._id, data:{$gt: new Date(dataAtual.getMonth()-5+"/28/"+dataAtual.getFullYear()) }};

		Abastecimento.find(config).forEach(element => {
				let index = element.data.getMonth();
				if(typeof doc.gastoPorMes[index] === 'undefined')
					doc.gastoPorMes[index] = {qnt: 1, data:element.data, valor:element.valor};
				else{
					doc.gastoPorMes[index].qnt += 1;
					doc.gastoPorMes[index].valor += element.valor;
				}
		});

		$Evento.find(config).forEach(element => {
			let index = element.data.getMonth();
			if(typeof doc.gastoPorMes[index] === 'undefined')
				doc.gastoPorMes[index] = {qnt: 1, data:element.data, valor:element.valor};
			else{
				doc.gastoPorMes[index].qnt += 1;
				doc.gastoPorMes[index].valor += element.valor;
			}
		});


		for(let index = dataAtual.getMonth()-4; index <= dataAtual.getMonth(); index++){
			if(typeof doc.gastoPorMes[index] === 'undefined'){
				doc.gastoPorMes[index] = {qnt: 0, data: new Date(index+"/1/"+dataAtual.getFullYear()), valor: 0};
			}
		}

		doc.gastoAtual = doc.gastoPorMes[dataAtual.getMonth()].valor;
		return doc;
		
	}
});

$Carro = Carro;