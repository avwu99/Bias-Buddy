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
  highlightPostTag: '</span>'
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
    hitsPerPage: 10,
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