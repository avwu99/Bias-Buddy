function hitTemplate(hit) {
  return `
    <div class="hit">
      <div class="hit-content">
        <h4>${hit._highlightResult.News_Source.value}</h4>
      </div>
    </div>
  `;
}

var client = algoliasearch('C2ZUSONNI6', '175bcd12d4a450b773d484e3a8f039dc');
var index = client.initIndex('news_bias');

index.setSettings({
  attributesToHighlight: ['*'],
  highlightPreTag: '<span>',
  highlightPostTag: '</span>',
  hitsPerPage: 8,
  paginationLimitedTo: 8
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
        datasets: [{
            label: 'Scatter Dataset',
            data: [{
                x: -10,
                y: 0
            }, {
                x: 0,
                y: 10
            }, {
                x: 10,
                y: 5
            }]
        }]
    },
    options: {
        scales: {
            xAxes: [{
                type: 'linear',
                position: 'bottom'
            }],
            yAxes: [{
                    ticks: {
                        min: 0,
                        beginAtZero: true
                    }
                }]
        },
        legend: {
            display: false
         }
    }
});

function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}