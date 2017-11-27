import { Session } from 'meteor/session';
var me = this;

Template.meusCarros.helpers({
	campos:	{formName:"formCadCar", inputs: [
			{desc:"Marca", nome:'marca', tipo:"text"},
			{desc:"Modelo", nome:'modelo', tipo:"text"},
			{desc:"Placa", nome:'placa', tipo:"text"},
			{desc:"Ano", nome:'ano', tipo:"Number"},
			{desc:"KM Atual", nome:'kmatual', tipo:"Number"},
			{desc:"KM/L", nome:'kml', tipo:"Number"}
	]},
	meusVeiculos: $Carro.find()
});


Template.meusCarros.events({
	'click #new'(e){
		e.preventDefault();
		Session.set('selectedItem', null);
		me.$("#marca").val(null);
		me.$("#modelo").val(null);
		me.$("#placa").val(null);
		me.$("#ano").val(null);
		me.$("#kmatual").val(null);
		me.$("#kml").val(null);
		me.$("#formularioCadCar").modal("show");
		
	},
	'click button[name=edit]'(e){
		e.preventDefault();
		Session.set("selectedItem", this._id);
		me.$("#marca").val(this.marca);
		me.$("#modelo").val(this.modelo);
		me.$("#placa").val(this.placa);
		me.$("#ano").val(this.ano);
		me.$("#kmatual").val(this.kmAtual);
		me.$("#kml").val(this.kmByLitro);
		me.$("#formularioCadCar").modal("show");
	},
	'submit #formCadCar'(e){
		e.preventDefault();
		var carro = {
			marca: e.target.marca.value,
			modelo: e.target.modelo.value,
			placa: e.target.placa.value,
			ano: Number(e.target.ano.value),
			kmAtual: Number(e.target.kmatual.value),
			kmByLitro: Number(e.target.kml.value),
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
		  text: "Uma vez deletado, voc� n�o poder� recuperar!",
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


