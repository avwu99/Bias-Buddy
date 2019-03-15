
new Chart(document.getElementById("lineChart"),{
	"type":"line",
	"data":{"labels":["January","February","March","April","May","June","July","August","September"],
	"datasets":[{"label":"Conservative",
	"data":[12,15,11,8,5,10,7,9,4],
	"fill":false,"borderColor":"rgb(255, 0, 0)",
	"lineTension":0.25},
	{"label":"Liberal",
	"data":[7,9,11,8,12,15,18,13,9],
	"fill":false,"borderColor":"rgb(0, 0, 255)",
	"lineTension":0.25}]},
	"options":{}
});

