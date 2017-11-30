import { Session } from 'meteor/session';
var me = this;

Template.eventos.helpers({
    eventos: $Evento.find(),
	campos:	{formName:"cadEventos", inputs: [
			{desc:"Descrição", nome:'descricao', tipo:"text"},
			{desc:"Tipo", nome:'tipo', tipo:"combobox", items:[
				{_id:'Troca de Pneus', modelo:'Troca de Pneus'}, 
				{_id:'Revisao', modelo:'Revisão'}, 
				{_id:'Multa', modelo:'Multa'},
				{_id:'Outros', modelo:'Outros'}
			]},
			{desc:"Valor", nome:'valor', tipo:"number"},
            {desc:"Data", nome:'data', tipo:"date"},
            {desc:"Carro", nome:'carro', tipo:"combobox", items:$Carro.find()}            
	]}
});


Template.eventos.events({
	'click #new'(e){
		e.preventDefault();
		Session.set('selectedItem', null);
		me.$("#descricao").val(null);
        me.$("#valor").val(null);
        me.$("#data").val(new Date().yyyymmdd());
		me.$("#modalEvento").modal("show");
		
	},
	'click button[name=edit]'(e){
		e.preventDefault();
		Session.set("selectedItem", this._id);
		me.$("#descricao").val(this.descricao);
		me.$("#tipo").val(this.tipo);
        me.$("#valor").val(this.valor);        
        me.$("#data").val(new Date(this.data).yyyymmdd());
        me.$("#carro").val(this.carroID);
		me.$("#modalEvento").modal("show");
	},
	'submit #cadEventos'(e){
		e.preventDefault();
		var evento = {
			descricao: e.target.descricao.value,
			tipo: e.target.tipo.value,
			valor: Number(e.target.valor.value),
            data: new Date(e.target.data.value),
            carroID: e.target.carro.value,
			owner: 'owner'
		};
		if(evento.tipo === 'Revisao'){
			Meteor.call('carro.revisao', $Carro.findOne({_id: evento.carroID}), evento, Session.get('selectedItem'), function(err, result){
				if(err){
					swal("Oops!", "Alguma coisa deu errado", "error")
				}else{
					me.$("#modalEvento").modal("toggle");				
				}			
			});
		}else if(evento.tipo === 'Troca de Pneus'){
			Meteor.call('carro.trocaPneu', $Carro.findOne({_id: evento.carroID}), evento, Session.get('selectedItem'), function(err, result){
				if(err){
					swal("Oops!", "Alguma coisa deu errado", "error")
				}else{
					me.$("#modalEvento").modal("toggle");				
				}			
			});
		}else {
			Meteor.call('evento.save', evento, Session.get('selectedItem'), function(err, result){
				if(err){
					swal("Oops!", "Alguma coisa deu errado", "error")
				}else{
					me.$("#modalEvento").modal("toggle");				
				}			
			});
		}
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
			Meteor.call('evento.delete', id);
			  swal("Poof!", "Registro deletado!", "success");
			}
		);
	}
});


