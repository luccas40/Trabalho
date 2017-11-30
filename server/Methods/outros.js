import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';



Meteor.methods({
    'carro.trocaPneu'(carro, evento, id){
        //check(id, String);
        if(id == null){
            carro.rodas.km = 0;
            let eventOne = {};		
            eventOne.descricao = "Pneus Trocados",
            eventOne.tipo = "Troca de Pneus",
            eventOne.valor = Number(evento.valor),
            eventOne.data = new Date(evento.data),
            eventOne.data.setDate(eventOne.data.getDate() + 1);
            eventOne.carroID = carro._id,
            eventOne.owner = this.userId;
            $Carro.update(carro._id, {$set:carro});
            $Evento.insert(eventOne);
        }else{
            evento.owner = this.userId;
            evento.data.setDate(evento.data.getDate()+1);
            $Evento.update(id, {$set:evento});
        }
    },
    'carro.calibrar'(carro, data){
        //check(id, String);
        carro.rodas.calibrado = new Date(data);
        carro.rodas.calibrado.setDate(carro.rodas.calibrado.getDate() + 1);
        $Carro.update(carro._id, {$set:carro});
    },
    'carro.corrigirKM'(carro, km){
        //check(id, String);
        let kmLitro = (carro.kmByLitro * km) / carro.kmAtual;
        carro.kmAtual = km;
        carro.kmByLitro = kmLitro.toFixed(1);
        $Carro.update(carro._id, {$set:carro});
    },
    'carro.revisao'(carro, evento, id){
        //check(id, String);
        if(id == null){
            let eventOne = {};		
            eventOne.descricao = "Revisao marcada",
            eventOne.tipo = "Revisao",
            eventOne.valor = Number(evento.valor),
            eventOne.data = new Date(evento.data),
            eventOne.data.setDate(eventOne.data.getDate() + 1);
            eventOne.carroID = carro._id,
            eventOne.owner = this.userId;
            carro.revisao = 0;
            $Carro.update(carro._id, {$set:carro});
            $Evento.insert(eventOne);
        }else{
            evento.owner = this.userId;
            evento.data.setDate(evento.data.getDate()+1);
            $Evento.update(id, {$set:evento});
        }
    }
});