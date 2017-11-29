import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods(
	{'conta.insert'(conta){
		check(conta, {
			email: String,
			username: String,
			password: String,
			profile: {
				firstName: String
			}
		});
		const mailExists = Accounts.findUserByEmail(conta.email);
		const userExists = Accounts.findUserByUsername(conta.username);
		if (!userExists && !mailExists) {
			Accounts.createUser(conta);				
		}else{
			throw new Meteor.Error('bad', 'email ou usuario ja existe');
		}	
	}
});

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
		if($Carro.find({placa: carro.placa}).count() == 0){
			carro.rodas = {km:0, calibrado:new Date()};
			carro.revisao = 0;
			$Carro.insert(carro);
		}
	}else{
		$Carro.update(id, {$set:carro});
	}
	
	}
});

Meteor.methods(
	{'abastecimento.save'(abastecimento, id){
		check(abastecimento, {
			litros: Number,
			valor: Number,
			data: Date,
			carroID: String,
			owner: String
		});
	abastecimento.owner = this.userId;		
	if(id == null){
		
		$Abastecimento.insert(abastecimento);
	}else{
		//Abastecimentos.update(id, {$set:abastecimento});
	}
	
	}
});

Meteor.methods(
	{'corrida.save'(corrida, id){
		check(corrida, {
			km: Number,
			data: Date,
			carroID: String,
			owner: String
		});
	corrida.owner = this.userId;		
	if(id == null){		
		$Corrida.insert(corrida);
	}else{
		$Corrida.update(id, {$set:corrida});
	}
	
	}
});

Meteor.methods(
	{'evento.save'(evento, id){
		check(evento, {
			descricao: String,
			tipo: String,
			valor: Number,
			data: Date,
			carro: String,
			owner: String
		});		
	evento.owner = this.userId;
	if(id == null){	
		$Evento.insert(evento);		
	}else{
		$Evento.update(id, {$set:evento});
	}
	
	}
});