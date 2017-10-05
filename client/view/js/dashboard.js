import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Carros } from '/imports/collections/carros';
import '/imports/js/Chart.bundle.min.js';
import '/imports/js/myChart.js';

var me = this;



Template.dashboard.onRendered(function(){
	
	var configTroca = {
			type: 'doughnut',
			data: {
				labels: [
				  "KM Restante",
				  "KM Percorrido"
				],
				datasets: [{
					data: [50, 300],
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
					text: '90%',
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
	
		var configCalibra = {
			type: 'doughnut',
			data: {
				labels: [
				  "Dias Restantes",
				  "Dias Percorridos"
				],
				datasets: [{
					data: [50, 300],
					backgroundColor: [
					  "#9c9d9e",
					  "#8000bc"
					],
					hoverBackgroundColor: [
					  "#b6b8ba",
					  "#9a00e2"
					]
				}]
			},
		options: {
			elements: {
				center: {
					text: '90%',
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

    

    new Chart($('#troca')[0].getContext('2d'), configTroca);
	new Chart($('#calibragem')[0].getContext('2d'), configCalibra);
	
  

});

Template.dashboard.helpers({
	carroSelected: function(){
		var a;
		if(Session.get('selected') == null)
			a = Carros.findOne();
		else
			a = Carros.findOne({_id: Session.get('selected')});
		return a;		
	}
	
});



Template.dashboard.events({
	'change #carroSelecionado'(e){
		Session.set('selected', e.target.value);
	}

});
