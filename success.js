function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
}

document.addEventListener('DOMContentLoaded', function() {
    var userId = getQueryVariable('userId');
    if (userId) {
        document.getElementById('message').innerText += ' Wait for around 10 minutes for scraping to finish.';
        document.getElementById('info').innerText = 'To retrieve JSON posts, visit https://stingray-app-l9lbc.ondigitalocean.app/api/retrieveData?userId=' + userId;
    }
});
