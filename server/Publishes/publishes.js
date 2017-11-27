import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

Meteor.publish('carros', function(){
    return $Carro.find({owner: this.userId});
});

Meteor.publish('abastecimentos', function(){
    return $Abastecimento.find({owner: this.userId});		
});

Meteor.publish('corridas', function(){
    return $Corrida.find({owner: this.userId});		
});