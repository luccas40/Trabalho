import { Corridas } from '/imports/collections/corridas';
import { Carros } from '/imports/collections/carros';
import { Session } from 'meteor/session';
var me = this;

Meteor.subscribe('carro.findByUser');

Template.corridas.helpers({
    carCorrida: function(){
		Meteor.subscribe('corrida.findByUser');
        return Corridas.find();
    },
	campos:	{formName:"cadCorrida", inputs: [
			{desc:"KM", nome:'km', tipo:"number"},
			{desc:"Data", nome:'data', tipo:"date"},
			{desc:"Carro", nome:'carro', tipo:"combobox", items:Carros.find()}
	]}
});


Template.corridas.events({
	'click #new'(e){
		e.preventDefault();
		Session.set('selectedItem', null);
		me.$("#km").val(null);
		me.$("#carro").val(null);
		me.$("#modalCorrida").modal("show");
		
	},
	'click button[name=edit]'(e){
		e.preventDefault();
		Session.set("selectedItem", this._id);
		me.$("#km").val(this.km);
		me.$("#carro").val(this.carro._id);
		me.$("#modalCorrida").modal("show");
	},
	'submit #cadCorrida'(e){
		e.preventDefault();
		var corrida = {
			km: Number(e.target.km.value),
			data: new Date(e.target.data.value),
			carroID: e.target.carro.value,
			owner: 'owner'
		}
		
		Meteor.call('corrida.save', corrida, Session.get('selectedItem'), function(err, result){
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


