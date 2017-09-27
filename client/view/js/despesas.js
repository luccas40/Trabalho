import { Despesas } from '/imports/collections/despesas';
import { Session } from 'meteor/session';
var me = this;

Template.despesas.helpers({
    myDespesas: function(){
		Meteor.subscribe('corrida.findByUser');
        return Despesas.find();
    },
	campos:	{formName:"cadCorrida", inputs: [
			{desc:"Descricao", nome:'descricao', tipo:"text"},
			{desc:"Tipo", nome:'tipo', tipo:"combobox"},
			{desc:"Valor", nome:'valor', tipo:"number"},
			{desc:"Data", nome:'data', tipo:"date"}
	]}
});


Template.despesas.events({
	'click #new'(e){
		e.preventDefault();
		Session.set('selectedItem', null);
		me.$("#descricao").val(null);
		me.$("#tipo").val(null);
		me.$("#valor").val(null);
		me.$("#data").val(null);
		me.$("#modalCorrida").modal("show");
		
	},
	'click button[name=edit]'(e){
		e.preventDefault();
		Session.set("selectedItem", this._id);
		me.$("#descricao").val(this.descricao);
		me.$("#tipo").val(this.tipo);
		me.$("#valor").val(this.valor);
		me.$("#data").val(this.data);
		me.$("#modalCorrida").modal("show");
	},
	'submit #formCadCar'(e){
		e.preventDefault();
		var carro = {
			descricao: e.target.descricao.value,
			tipo: e.target.tipo.value,
			valor: e.target.valor.value,
			data: e.target.data.value,
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


