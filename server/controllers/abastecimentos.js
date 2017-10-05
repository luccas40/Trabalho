import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Abastecimentos } from '/imports/collections/abastecimentos';

Meteor.methods(
	{'abastecimento.save'(abastecimento, id, carro){
		check(abastecimento, {
			litros: Number,
			valor: Number,
			data: Date,
			carro: String,
			owner: String
		});
	abastecimento.owner = this.userId;		
	if(id == null){		
		Abastecimentos.insert(abastecimento);
	}else{
		Abastecimentos.update(id, {$set:abastecimento});
	}
	
	}
});

	Meteor.methods(
		{'abastecimento.delete'(id){
			check(id, String);		
			Abastecimentos.remove(id);
		}
	});

	Meteor.methods(
		{'abastecimento.find'(id){
			check(id, String);
			return Abastecimentos.findOne({_id: id});
		}
	});

	Meteor.publish('abastecimento.findByUser', function(){
			return Abastecimentos.find({owner: this.userId});		
		}
	);