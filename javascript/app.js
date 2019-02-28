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

function plotSource(news_source, horz_rank, vert_rank){
  data = {
    x: horz_rank,
    y: vert_rank
  }
  color = colors[horz_rank + 44]
  addData(scatterChart, news_source, data, color)
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
      pointBackgroundColor: []
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
          labelString: 'Left  🡨  Political Bias  🡪  Right',
          fontSize: 18
        },
        ticks: {
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

var myRainbow = new Rainbow();
var numberOfItems = 89;
var s = '';

myRainbow.setNumberRange(1, numberOfItems);
myRainbow.setSpectrum('blue', 'white', 'red');
colors = [];

for (var i = 1; i <= numberOfItems; i++) {
    var hexColour = myRainbow.colourAt(i);
    colors.push('#' + hexColour);
}