function hitTemplate(hit) {
  return `
    <div class="hit">
      <div class="hit-content">
        <div onclick="plotSource(&quot;${hit.News_Source}&quot;, ${hit.Horizontal_Rank}, ${hit.Vertical_Rank})">
          <h4>${hit._highlightResult.News_Source.value}</h4>
        </div>
      </div>
    </div>
  `;
}

function testExamples(news_source){
  index.search({ query: news_source }).then(res => {
  plotSource(res.hits[0].News_Source, res.hits[0].Horizontal_Rank, res.hits[0].Vertical_Rank);
  });
}

function plotSource(news_source, horz_rank, vert_rank){
  data = {
    x: horz_rank,
    y: vert_rank
  }
  color = colors[horz_rank + 44]
  addData(scatterChart, news_source, data, color)
}

var currentHits = [];

function wipeCurrentHits(event) {
  currentInput = document.getElementsByClassName("ais-search-box--input")[0].value;
  guide = document.getElementById("guide");
  var x = event.which || event.keyCode; 
  if (x != 13) {
    currentHits = [];
  }
  if (x == 8 && currentInput.length <= 1 ) {
    guide.style.display = "block";
  } else {
    guide.style.display = "none";
  }
}

//guide also displayed here, because keydown does not account for control + A then delete
//due to the length of the input before delete being greater than 1
//able to display guide via keyup, but slight lag time
function getSources(event) {
  currentInput = document.getElementsByClassName("ais-search-box--input")[0].value;
  guide = document.getElementById("guide");
  if (!currentInput && guide.style.display == "none") {
    guide.style.display = "block";
  }
  var x = event.which || event.keyCode; 
  if (x == 13) {  
    plotSource(currentHits[0].News_Source, currentHits[0].Horizontal_Rank, currentHits[0].Vertical_Rank);
  }
}

var client = algoliasearch('C2ZUSONNI6', '175bcd12d4a450b773d484e3a8f039dc');
var index = client.initIndex('news_bias');

index.setSettings({
  attributesToHighlight: ['*'],
  highlightPreTag: '<span>',
  highlightPostTag: '</span>',
  hitsPerPage: 12,
  paginationLimitedTo: 12
});

const search = instantsearch({
  appId: "C2ZUSONNI6",
  apiKey: "ace8178d8d8f86f292f600e2e324e5fe",
  indexName: "news_bias",
  searchFunction: function(helper) {
    if (helper.state.query === '') {
      document.querySelector('#hits').innerHTML = '';
      return;
    }
    helper.search();
  }
});

search.addWidget(
  instantsearch.widgets.hits({
    container: "#hits",
    templates: {
      empty: "No results.",
      item: function(hit) {
        currentHits.push(hit);
        return hitTemplate(hit);
      }
    }
  })
);

search.addWidget(
  instantsearch.widgets.searchBox({
    container: "#searchbox",
    placeholder: "Enter a news source",
    autofocus: false
  })
);

search.start();

var ctx = document.getElementById("myChart").getContext('2d');
var scatterChart = new Chart(ctx, {
  type: 'scatter',
  data: {
    labels: [],
    datasets: [{
      label: 'Scatter Dataset',
      data: [],
      pointRadius: 8,
      pointHoverRadius: 8,
      pointBackgroundColor: [],
      pointBorderColor: '#666666'
    }]
  },
  options: {
    tooltips: {
      callbacks: {
        label: function(tooltipItem, data) {
          return data.labels[tooltipItem.index];
        },
      },
      bodyFontSize: 15,
      displayColors: false
    },
    scales: {
      xAxes: [{
        type: 'linear',
        position: 'bottom',
        scaleLabel: {
          display: true,
          labelString: '          Liberal     🡨    Political Bias    🡪     Conservative',
          fontSize: 18
        },
        ticks: {
          display: false,
          max: 50,
          min: -50
        },
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Accuracy of Reporting',
          fontSize: 18
        },
        ticks: {
          display: false,
          max: 70,
          min: 0
        },
      }]
    },
    legend: {
      display: false
    }
  }
});

function addData(chart, label, data, color) {
  chart.data.labels.push(label);
  chart.data.datasets[0].data.push(data);
  chart.data.datasets[0].pointBackgroundColor.push(color);
  chart.update();
}

function clearGraph() {
  scatterChart.data.labels = [];
  scatterChart.data.datasets[0].data = [];
  scatterChart.data.datasets[0].pointBackgroundColor = [];
  scatterChart.update();
}

var myRainbow = new Rainbow();
var numberOfItems = 89;

myRainbow.setNumberRange(1, numberOfItems);
myRainbow.setSpectrum('blue', 'white', 'red');
colors = [];

for (var i = 1; i <= numberOfItems; i++) {
    var hexColour = myRainbow.colourAt(i);
    colors.push('#' + hexColour);
}