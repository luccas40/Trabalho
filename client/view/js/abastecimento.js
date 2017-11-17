import { Carros } from '/imports/collections/carros';
import { Session } from 'meteor/session';
var me = this;

Meteor.subscribe('carro.findByUser');

Template.abastecimento.helpers({
	campos:	{formName:"cadAbast", inputs: [
			{desc:"Litros", nome:'litros', tipo:"number"},
			{desc:"Data", nome:'data', tipo:"date"},
			{desc:"Valor (R$)", nome:'valor', tipo:"Number"},
			{desc:"Carro", nome:'carroID', tipo:"combobox", items:Carros.find()}
	]}
});


Template.abastecimento.events({
	'click #new'(e){
		e.preventDefault();
		Session.set('selectedItem', null);
		me.$("#litros").val(null);
		me.$("#valor").val(null);
		me.$("#carroID").val(null);
		me.$("#modalAbast").modal("show");
		
	},
	'click button[name=edit]'(e){
		e.preventDefault();
		Session.set("selectedItem", this._id);
		me.$("#litros").val(this.litros);
		me.$("#valor").val(this.valor);
		me.$("#carroID").val(this.carroID._id);
		me.$("#modalAbast").modal("show");
	},
	'submit #cadAbast'(e){
		e.preventDefault();
		var corrida = {
			litros: Number(e.target.litros.value),
			valor: Number(e.target.valor.value),
			data: new Date(e.target.data.value),
			carroID: e.target.carroID.value,
			owner: 'owner'
		}
		
		Meteor.call('abastecimento.save', corrida, Session.get('selectedItem'), function(err, result){
			if(err){
				swal("Oops!", "Alguma coisa deu errado", "error")
			}else{
				me.$("#modalAbast").modal("toggle");				
			}			
		});
	},
	'click button[name=delete]'(e){
		e.preventDefault();
		const id = this._id;
		swal({
		  title: "Tem certeza?",
		  text: "Uma vez deletado, voc� n�o poder� recuperar!",
		  showCancelButton: true,
		  confirmButtonColor: "#DD6B55",
		  confirmButtonText: "Sim!",
		  closeOnConfirm: false
		}, function(){
			Meteor.call('abastecimento.delete', id);
			  swal("Poof!", "Registro deletado!", "success");
			}
		);
	}
});


