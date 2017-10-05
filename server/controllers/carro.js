import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Carros } from '/imports/collections/carros';

Meteor.methods(
	{'carro.save'(carro, id){
		check(carro, {
			marca: String,
			modelo: String,
			placa: String,
			ano: Number,
			kmByLitro: Number,
			kmAtual: Number,
			rodas: {trocado:Date, calibrado:Date},			
			owner: String
		});		
	carro.owner = this.userId;
	if(id == null){	
		if(Carros.find({placa: carro.placa}).count() == 0){
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
			return Carros.find({owner: this.userId});		
		}
	);