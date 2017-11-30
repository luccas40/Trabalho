import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

var me = this;
var mesLabel = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];


var Troca;
var Calibra;
var Revisao;
var Gasto;

Template.dashboard.onRendered(function(){

    Troca = new Chart($('#troca')[0].getContext('2d'), $troca);
	Calibra = new Chart($('#calibragem')[0].getContext('2d'), $calibra);
	Revisao = new Chart($('#revisao')[0].getContext('2d'), $revisa);
	Gasto = new Chart($('#graficoGastoMensal')[0].getContext('2d'), $gasto);
	
	updateCharts();
	if(typeof Session.get("idCarroSelecionado") !== 'undefined')
		me.$("#carroSelecionado").val(Session.get("idCarroSelecionado"));

});

Template.dashboard.helpers({
	carroSelected: function(){ return getCarroSelecionado(); },
	mesText: mesLabel[new Date().getMonth()],
	meusVeiculos: $Carro.find(),
	eventosCount: function(){
		let tcar = getCarroSelecionado();
		if(typeof tcar !== 'undefined') return	$Evento.find({carro: tcar._id}).count();
		return 0;
	}	
});





Template.dashboard.events({
	'change #carroSelecionado'(e){
		updateCharts(getCarroSelecionado(e.target.value));
	},
	'submit #pneuTroca'(e){
		e.preventDefault();
		let evento = {valor: e.target.valor.value, data: new Date(e.target.data.value)};
		console.log(evento);
		Meteor.call('carro.trocaPneu', getCarroSelecionado(), evento, null, function(err, result){
			if(err){
				swal("Oops!", "Alguma coisa deu errado", "error")
			}else{
				me.$("#modalTrocaPneus").modal("toggle");
				updateCharts(getCarroSelecionado());				
			}			
		});
	},		
	'submit #kmCorrigir'(e){
		e.preventDefault();
		Meteor.call('carro.corrigirKM', getCarroSelecionado(), e.target.km.value, function(err, result){
			if(err){
				swal("Oops!", "Alguma coisa deu errado", "error")
			}else{
				me.$("#modalCorrigir").modal("toggle");
				updateCharts(getCarroSelecionado());				
			}			
		});
	},
	'submit #Calibrar'(e){
		e.preventDefault();
		Meteor.call('carro.calibrar', getCarroSelecionado(), e.target.data.value, function(err, result){
			if(err){
				swal("Oops!", "Alguma coisa deu errado", "error")
			}else{
				me.$("#modalCalibrar").modal("toggle");
				updateCharts(getCarroSelecionado());				
			}			
		});
	}

});

function getCarroSelecionado(id){
	var car;	
	if(typeof Session.get('idCarroSelecionado') === 'undefined'){
		if(typeof id === 'undefined') car = $Carro.findOne();
		else car = $Carro.findOne({_id: id});
		Session.set('idCarroSelecionado', car._id);
	}
	else
		if(typeof id === 'undefined'){
			car = $Carro.findOne({_id: Session.get('idCarroSelecionado')});
		}
		else{
			car = $Carro.findOne({_id: id});
			Session.set('idCarroSelecionado', car._id);
		}	
	return car;
}




function updateCharts(car){
	if(typeof car === 'undefined')
		car = getCarroSelecionado();
	var CalibraTempo = Math.round((new Date().getTime()-car.rodas.calibrado.getTime())/(1000*60*60*24));
	Troca.data.datasets[0].data[0] = car.rodas.km; // KM Rodados
	Troca.data.datasets[0].data[1] = 50000-car.rodas.km; // KM Restante
	Troca.options.elements.center.text = Math.round(((50000-car.rodas.km)/50000)*100)+"%";
	Troca.update();
	Calibra.data.datasets[0].data[0] = CalibraTempo; // Dias Percorridos
	Calibra.data.datasets[0].data[1] = (20-CalibraTempo < 0)?0:20-CalibraTempo; // Dias Restantes
	Calibra.options.elements.center.text = Math.round((((20-CalibraTempo < 0)?0:20-CalibraTempo)/20)*100)+"%";
	Calibra.update();	
	Revisao.data.datasets[0].data[0] = car.revisao; // KM Percorridos
	Revisao.data.datasets[0].data[1] = 10000-car.revisao; // KM Restantes
	Revisao.options.elements.center.text = Math.round(((10000-car.revisao)/10000)*100)+"%";
	Revisao.update();	

	Gasto.data.labels = [];
	Gasto.data.datasets[0].data = [];
	var mesAtual = new Date().getMonth();
	for(let index = mesAtual - 4; index <= mesAtual; index++){
		Gasto.data.labels.push(mesLabel[index]);
		Gasto.data.datasets[0].data.push(car.gastoPorMes[index].valor);
	}
	Gasto.update();	
}