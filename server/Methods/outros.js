import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';



Meteor.methods(
    {'carro.trocaPneu'(carro, valor, data){
        //check(id, String);
        carro.rodas.km = 0;
        let eventOne = {};		
        eventOne.descricao = "Pneus Trocados",
        eventOne.tipo = "Troca de Pneus",
        eventOne.valor = Number(valor),
        eventOne.data = new Date(data),
        eventOne.carroID = carro._id,
        eventOne.owner = this.userId;
        $Carro.update(carro._id, {$set:carro});
        $Evento.insert(eventOne);
    }
});