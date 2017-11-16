import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Carros } from '/imports/collections/carros';
import { Abastecimentos } from '/imports/collections/abastecimentos';

Meteor.methods(
	{'carro.save'(carro, id){
		check(carro, {
			marca: String,
			modelo: String,
			placa: String,
			ano: Number,
			kmByLitro: Number,
			kmAtual: Number,
			owner: String
		});		
	carro.owner = this.userId;
	if(id == null){	
		if(Carros.find({placa: carro.placa}).count() == 0){
			carro.rodas = {km:0, calibrado:new Date()};
			carro.revisao = 0;
			Carros.insert(carro);
		}
	}else{
		Carros.update(id, {$set:carro});
	}
	
	}
});

	Meteor.methods(
		{'carro.delete'(id){
			check(id, String);		
			Carros.remove(id);
		}
	});
	
	Meteor.publish('carro.findByUser', function(){
			var car = Carros.find({owner: this.userId});
			car.gastoPorMes = Abastecimentos.aggregate([
				{ $match:{carroID: car._id} },
				{ $group:{_id: {$month: "$data"}, "valor": {$sum:"$valor"}} }
			]);
			return car;		
		}
	);