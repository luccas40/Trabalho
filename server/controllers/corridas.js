import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Corridas } from '/imports/collections/corridas';

Meteor.methods(
	{'corrida.save'(corrida, id){
		check(corrida, {
			km: Number,
			data: Date,
			carroID: String
		});	
	if(id == null){		
		Corridas.insert(corrida);
	}else{
		Corridas.update(id, {$set:corrida});
	}
	
	}
});

	Meteor.methods(
		{'corrida.delete'(id){
			check(id, String);		
			Corridas.remove(id);
		}
	});

	Meteor.methods(
		{'corrida.find'(id){
			check(id, String);
			return Corridas.findOne({_id: id});
		}
	});

	Meteor.publish('corrida.findByUser', function(){
			return Corridas.find({owner: this.userId});		
		}
	);