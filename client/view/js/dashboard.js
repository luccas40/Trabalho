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
	me.$("#carroSelecionado").val(Session.get("selected")._id);

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
	}

});

function getCarroSelecionado(id){
	var car;	
	if(typeof Session.get('selected') === 'undefined'){
		car = $Carro.findOne();
		Session.set('selected', car);
	}
	else
		if(typeof id === 'undefined')
			return Session.get('selected');
		else if(typeof Session.get('selected')._id === id)
			return Session.get('selected');
		else{
			car = $Carro.findOne({_id: id});
			Session.set('selected', car);
		}	
	return car;
}




function updateCharts(car){
	if(typeof car === 'undefined')
		car = getCarroSelecionado();
	var CalibraTempo = Math.round((new Date().getTime()-car.rodas.calibrado.getTime())/(1000*60*60*24));
	Troca.data.datasets[0].data[0] = 50000-car.rodas.km; // KM Restante
	Troca.data.datasets[0].data[1] = car.rodas.km; // KM Rodados
	Troca.options.elements.center.text = Math.round((car.rodas.km/50000)*100)+"%";
	Troca.update();
	Calibra.data.datasets[0].data[0] = (20-CalibraTempo < 0)?0:20-CalibraTempo; // Dias Restantes
	Calibra.data.datasets[0].data[1] = CalibraTempo; // Dias Percorridos
	Calibra.options.elements.center.text = Math.round((CalibraTempo/20)*100)+"%";
	Calibra.update();	
	Revisao.data.datasets[0].data[0] = 10000-car.revisao; // KM Restantes
	Revisao.data.datasets[0].data[1] = car.revisao; // KM Percorridos
	Revisao.options.elements.center.text = Math.round((car.revisao/10000)*100)+"%";
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