import { Carros } from '/imports/collections/carros';
import { Session } from 'meteor/session';
var me = this;

Template.meusCarros.helpers({
    veiculos: function(){
		Meteor.subscribe('carro.findByUser');
        return Carros.find();
    }
});

Template.meusCarros.events({
	'click #new'(e){
		e.preventDefault();
		Session.set('selectedItem', null);
		me.$("#marca").val(null);
		me.$("#modelo").val(null);
		me.$("#placa").val(null);
		me.$("#formularioCadCar").modal("show");
		
	},
	'click button[name=edit]'(e){
		e.preventDefault();
		Session.set("selectedItem", this._id);
		me.$("#marca").val(this.marca);
		me.$("#modelo").val(this.modelo);
		me.$("#placa").val(this.placa);
		me.$("#formularioCadCar").modal("show");
	},
	'submit #formCadCar'(e){
		e.preventDefault();
		var carro = {
			marca: e.target.marca.value,
			modelo: e.target.modelo.value,
			placa: e.target.placa.value,
			owner: 'owner'
		}
		
		Meteor.call('carro.save', carro, Session.get('selectedItem'), function(err, result){
			if(err){
				swal("Oops!", "Alguma coisa deu errado", "error")
			}else{
				me.$("#formularioCadCar").modal("toggle");				
			}			
		});
	},
	'click button[name=delete]'(e){
		e.preventDefault();
		const id = this._id;
		swal({
		  title: "Tem certeza?",
		  text: "Uma vez deletado, você não poderá recuperar!",
		  showCancelButton: true,
		  confirmButtonColor: "#DD6B55",
		  confirmButtonText: "Sim!",
		  closeOnConfirm: false
		}, function(){
			Meteor.call('carro.delete', id);
			  swal("Poof!", "Registro deletado!", "success");
			}
		);
	}
});


