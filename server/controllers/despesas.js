import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Despesas } from '/imports/collections/despesas';

Meteor.methods(
	{'despesa.save'(despesa, id){
		check(despesa, {
			descricao: String,
			tipo: String,
			valor: Number,
			data: Date,
			owner: String
		});
	despesa.owner = this.userId;		
	if(id == null){		
		Despesas.insert(despesa);
	}else{
		Despesas.update(id, {$set:despesa});
	}
	
	}
});

	Meteor.methods(
		{'despesa.delete'(id){
			check(id, String);		
			Despesas.remove(id);
		}
	});

	Meteor.methods(
		{'despesa.find'(id){
			check(id, String);
			return Despesas.findOne({_id: id});
		}
	});

	Meteor.publish('despesa.findByUser', function(){
			return Despesas.find({owner: this.userId});		
		}
	);