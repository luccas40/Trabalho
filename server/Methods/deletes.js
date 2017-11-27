import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.methods(
    {'carro.delete'(id){
        check(id, String);		
        $Carro.remove(id);
    }
});

Meteor.methods(
    {'abastecimento.delete'(id){
        check(id, String);		
        $Abastecimento.remove(id);
    }
});

Meteor.methods(
    {'corrida.delete'(id){
        check(id, String);		
        $Corrida.remove(id);
    }
});