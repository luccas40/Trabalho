import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Carros } from '/imports/collections/carros';
import '/imports/js/Chart.bundle.min.js';
import '/imports/js/myChart.js';

var me = this;

var troca;
var calibra;
var revisa;
var gasto;

var gTroca;
var gCalibra;
var gRevisao;
var gGasto;

Template.dashboard.onRendered(function(){
	Session.set('selected', null);
	gasto = {
			type: 'line',
			data: {	labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
					datasets: [{label: "", fill: false, data: [0, 100, 100, 250, 213], backgroundColor: "#72a8ff", borderColor: "#72a8ff"}]
			},
			options: {
                responsive: true,
				legend: false,
                title:{display:true, text:'Gasto Mensal (R$)'},
                tooltips: {mode: 'index', intersect: false},
				hover:{mode: 'nearest', intersect: true},
                scales: {	xAxes: [{display: true, scaleLabel: {display: true, labelString: 'Mês'}}],
							yAxes: [{display: true, scaleLabel: {display: true, labelString: 'Gasto'}}]
                }
            }
		};
	
	troca = {
			type: 'doughnut',
			data: {	labels: ["KM Restante", "KM Percorrido"],
					datasets: [{data: [0, 0], backgroundColor: ["#9c9d9e", "#36A2EB"], hoverBackgroundColor: ["#b6b8ba", "#36A2EB"]}]
			},
			options: {elements: { center: { text: '0%', color: '#FF6384', fontStyle: 'Arial', sidePadding: 20}}, legend: {display: false}}
	};
	
	calibra = {
			type: 'doughnut',
			data: {	labels: ["Dias Restantes", "Dias Percorridos"],
					datasets: [{data: [0, 0], backgroundColor: ["#9c9d9e", "#8000bc"], hoverBackgroundColor: ["#b6b8ba", "#9a00e2"]}]
			},
			options: {elements: { center: { text: '0%', color: '#FF6384', fontStyle: 'Arial', sidePadding: 20}}, legend: {display: false}}
	};	
	
	revisa = {
			type: 'doughnut',
			data: {
				labels: [
				  "KM Restante",
				  "KM Percorrido"
				],
				datasets: [{
					data: [0, 0],
					backgroundColor: [
					  "#9c9d9e",
					  "#36A2EB"
					],
					hoverBackgroundColor: [
					  "#b6b8ba",
					  "#36A2EB"
					]
				}]
			},
		options: {
			elements: {
				center: {
					text: '0%',
				    color: '#FF6384', // Default is #000000
				    fontStyle: 'Arial', // Default is Arial
				    sidePadding: 20 // Defualt is 20 (as a percentage)
				}
			},
			legend: {
				display: false
			}
		}
	};
	
    gTroca = new Chart($('#troca')[0].getContext('2d'), troca);
	gCalibra = new Chart($('#calibragem')[0].getContext('2d'), calibra);
	gRevisao = new Chart($('#revisao')[0].getContext('2d'), revisa);
	gGasto = new Chart($('#graficoGastoMensal')[0].getContext('2d'), gasto);
	
});

Template.dashboard.helpers({
	carroSelected: function(){return getSelectedCar();}	
});





Template.dashboard.events({
	'change #carroSelecionado'(e){
		Session.set('selected', e.target.value);
		updateCharts();
	}

});


function getSelectedCar(){
	var a;
	if(Session.get('selected') == null)
		a = Carros.findOne();
	else
		a = Carros.findOne({_id: Session.get('selected')});
	updateCharts(a);
	return a;
}

function updateCharts(car){
	if(car != null){
		var calibraTempo = Math.round((new Date().getTime()-car.rodas.calibrado.getTime())/(1000*60*60*24));
		troca.data.datasets[0].data[0] = 50000-car.rodas.km; // KM Restante
		troca.data.datasets[0].data[1] = car.rodas.km; // KM Rodados
		troca.options.elements.center.text = Math.round((car.rodas.km/50000)*100)+"%";
		gTroca.update();
		calibra.data.datasets[0].data[0] = (20-calibraTempo < 0)?0:20-calibraTempo; // Dias Restantes
		calibra.data.datasets[0].data[1] = calibraTempo; // Dias Percorridos
		calibra.options.elements.center.text = Math.round((calibraTempo/20)*100)+"%";
		gCalibra.update();	
		revisa.data.datasets[0].data[0] = 10000-car.revisao; // KM Restantes
		revisa.data.datasets[0].data[1] = car.revisao; // KM Percorridos
		revisa.options.elements.center.text = Math.round((car.revisao/10000)*100)+"%";
		gRevisao.update();	
	}
}