/*import { Despesas } from '/imports/collections/despesas';
import { Session } from 'meteor/session';
var me = this;

Template.despesas.helpers({
    myDespesas: function(){
		Meteor.subscribe('despesa.findByUser');
        return Despesas.find();
    },
	campos:	{formName:"cadDespesas", inputs: [
			{desc:"Descricao", nome:'descricao', tipo:"text"},
			{desc:"Tipo", nome:'tipo', tipo:"combobox", items:[
				{_id:'Gasolina', modelo:'Gasolina'}, 
				{_id:'Revisao', modelo:'Revisao'}, 
				{_id:'Multa', modelo:'Multa'}]},
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
		me.$("#modalDespesas").modal("show");
		
	},
	'click button[name=edit]'(e){
		e.preventDefault();
		Session.set("selectedItem", this._id);
		me.$("#descricao").val(this.descricao);
		me.$("#tipo").val(this.tipo);
		me.$("#valor").val(this.valor);
		me.$("#modalDespesas").modal("show");
	},
	'submit #cadDespesas'(e){
		e.preventDefault();
		var despesa = {
			descricao: e.target.descricao.value,
			tipo: e.target.tipo.value,
			valor: Number(e.target.valor.value),
			data: new Date(e.target.data.value),
			owner: 'owner'
		}
		
		Meteor.call('despesa.save', despesa, Session.get('selectedItem'), function(err, result){
			if(err){
				swal("Oops!", "Alguma coisa deu errado", "error")
			}else{
				me.$("#modalDespesas").modal("toggle");				
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
			Meteor.call('despesa.delete', id);
			  swal("Poof!", "Registro deletado!", "success");
			}
		);
	}
});
*/

