Chart.pluginService.register({
	beforeDraw: function (chart) {
		if (chart.config.options.elements.center) {
			//Get ctx from string
			var ctx = chart.chart.ctx;
			
			//Get options from the center object in options
			var centerConfig = chart.config.options.elements.center;
			var fontStyle = centerConfig.fontStyle || 'Arial';
			var txt = centerConfig.text;
			var color = centerConfig.color || '#000';
			var sidePadding = centerConfig.sidePadding || 20;
			var sidePaddingCalculated = (sidePadding/100) * (chart.innerRadius * 2)
			//Start with a base font of 30px
			ctx.font = "30px " + fontStyle;
			
					//Get the width of the string and also the width of the element minus 10 to give it 5px side padding
			var stringWidth = ctx.measureText(txt).width;
			var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

			// Find out how much the font can grow in width.
			var widthRatio = elementWidth / stringWidth;
			var newFontSize = Math.floor(30 * widthRatio);
			var elementHeight = (chart.innerRadius * 2);

			// Pick a new font size so it will not be larger than the height of label.
			var fontSizeToUse = Math.min(newFontSize, elementHeight);

			//Set font settings to draw it correctly.
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
			var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
			ctx.font = fontSizeToUse+"px " + fontStyle;
			ctx.fillStyle = color;
			
			//Draw text in center
			ctx.fillText(txt, centerX, centerY);
		}
	}
});

$gasto = {
	type: 'line',
	data: {	labels: [],
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

$troca = {
	type: 'doughnut',
	data: {	labels: ["KM Percorrido", "KM Restante"],
			datasets: [{data: [0, 0], backgroundColor: ["#9c9d9e", "#36A2EB"], hoverBackgroundColor: ["#b6b8ba", "#36A2EB"]}]
	},
	options: {elements: { center: { text: '0%', color: '#FF6384', fontStyle: 'Arial', sidePadding: 20}}, legend: {display: false}}
};

$calibra = {
	type: 'doughnut',
	data: {	labels: ["Dias Percorridos", "Dias Restantes"],
			datasets: [{data: [0, 0], backgroundColor: ["#9c9d9e", "#8000bc"], hoverBackgroundColor: ["#b6b8ba", "#9a00e2"]}]
	},
	options: {elements: { center: { text: '0%', color: '#FF6384', fontStyle: 'Arial', sidePadding: 20}}, legend: {display: false}}
};	

$revisa = {
	type: 'doughnut',
	data: {
		labels: [
		  "KM Percorrido",
		  "KM Restante"
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