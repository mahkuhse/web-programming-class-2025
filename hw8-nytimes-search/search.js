var API_KEY = 'N3DULVvd71PGNRYGnLevkLc5eGaqFPiYchIIfisPFaqAWVcl';

function searchArticles() {
    var query = document.getElementById('searchInput').value;

    if (query == '') {
        alert('Please enter a search term!');
        return;
    }

    document.getElementById('loading').style.display = 'block';
    document.getElementById('results').innerHTML = '';

    var url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + query + '&api-key=' + API_KEY;

    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            document.getElementById('loading').style.display = 'none';

            if (data.response.docs.length > 0) {
                displayResults(data.response.docs);
            } else {
                document.getElementById('results').innerHTML = '<p>No articles found.</p>';
            }
        })
        .catch(function(error) {
            document.getElementById('loading').style.display = 'none';
            alert('Error: ' + error);
        });
}

function displayResults(articles) {
    var resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '<h3>Results:</h3>';

    for (var i = 0; i < articles.length; i++) {
        var article = articles[i];

        var articleDiv = document.createElement('div');
        articleDiv.className = 'card mb-3';

        var title = article.headline.main;
        var link = article.web_url;
        var description = article.abstract;
        if (!description) {
            description = 'No description available';
        }
        var date = new Date(article.pub_date).toLocaleDateString();

        articleDiv.innerHTML = '<div class="card-body">' +
            '<h5 class="card-title">' +
            '<a href="' + link + '" target="_blank">' + title + '</a>' +
            '</h5>' +
            '<p class="card-text">' + description + '</p>' +
            '<p class="text-muted">Published: ' + date + '</p>' +
            '</div>';

        resultsDiv.appendChild(articleDiv);
    }
}
