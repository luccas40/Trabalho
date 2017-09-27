import { Corridas } from '/imports/collections/corridas';
import { Session } from 'meteor/session';
var me = this;

Template.corridas.helpers({
    carCorrida: function(){
		Meteor.subscribe('corrida.findByUser');
        return Corridas.find();
    },
	campos:	{formName:"cadCorrida", inputs: [
			{desc:"KM", nome:'km', tipo:"number"},
			{desc:"Data", nome:'data', tipo:"date"},
			{desc:"Carro", nome:'carro', tipo:"combobox"}
	]}
});


Template.corridas.events({
	'click #new'(e){
		e.preventDefault();
		Session.set('selectedItem', null);
		me.$("#marca").val(null);
		me.$("#modelo").val(null);
		me.$("#placa").val(null);
		me.$("#modalCorrida").modal("show");
		
	},
	'click button[name=edit]'(e){
		e.preventDefault();
		Session.set("selectedItem", this._id);
		me.$("#marca").val(this.marca);
		me.$("#modelo").val(this.modelo);
		me.$("#placa").val(this.placa);
		me.$("#modalCorrida").modal("show");
	},
	'submit #formCadCar'(e){
		e.preventDefault();
		var carro = {
			marca: e.target.marca.value,
			modelo: e.target.modelo.value,
			placa: e.target.placa.value,
			owner: 'owner'
		}
		
		Meteor.call('corrida.save', carro, Session.get('selectedItem'), function(err, result){
			if(err){
				swal("Oops!", "Alguma coisa deu errado", "error")
			}else{
				me.$("#modalCorrida").modal("toggle");				
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
			Meteor.call('corrida.delete', id);
			  swal("Poof!", "Registro deletado!", "success");
			}
		);
	}
});


