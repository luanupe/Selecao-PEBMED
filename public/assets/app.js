var DB = new ChotaDB();
var API = 'http://127.0.0.1:8000/api/v1';
var REDIRECTS = [ 'Sessão desconectada', 'jwt malformed', 'jwt expired' ];

$(function() {
    DB.create('Tokens');
});

function buscarToken() {
    var tokens = DB.Tokens.findOne({}, { sort:DB.SORT.DSC }).get();
    return (tokens.length > 0) ? tokens[0] : null;
}

function getData(data) {
    return (data) ? moment(data).format("YYYY-MM-DD") : '';
}

function getDataHora(data) {
    return (data) ? moment(data).format("YYYY-MM-DD hh:mm:ss") : '';
}

function requestAPI(url, method, callback=undefined, payload=null, headers={}) {
    var auth = buscarToken();

    // Open request
    var xhr = new XMLHttpRequest();
    xhr.open(method, (API + url), true);

    // Inject authorization
    if ((auth)) xhr.setRequestHeader('x-access-token', auth.token);
    if ((payload)) xhr.setRequestHeader('Content-Type', 'application/json');

    // Inject headers
    let keys = Object.keys(headers);
    for (var key of keys) xhr.setRequestHeader(key, headers[key]);

    // Handle response
    xhr.onreadystatechange = function() {
        if ((xhr.readyState == XMLHttpRequest.DONE)) {
            let response = JSON.parse(xhr.responseText);
            if ((xhr.status == 401)) onErrors(response);
            else if ((callback)) callback(response);
        }
    }

    // Dispatch
    xhr.send(JSON.stringify(payload));
}

function getUrlParameter(nome) {
    var url = window.location.search.substring(1);
    var params = url.split('&');

    for (var i = 0; i < params.length; i++) {
        let param = params[i].split('=');
        if (param[0] === nome) return (typeof param[1] === undefined) ? '' : decodeURIComponent(param[1]);
    }
    return null;
}

function onErrors(errors) {
    if ((Array.isArray(errors.error))) onError(errors.error[0].msg);
    else onError(errors.error);
}

function onError(error) {
    if ((REDIRECTS.includes(error))) window.location.href = "/index.html";
    else alert(error);
}

$(document).ajaxError(function(e, request, s) {
    onErrors(request.responseJSON);
});