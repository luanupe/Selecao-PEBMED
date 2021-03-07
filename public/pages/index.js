function autenticar(email, senha) {
    requestAPI('/autenticar/login', 'POST', (response) => {

        DB.Tokens.insert({ medicoId: response.medicoId, token: response.token });
        window.location.href = "/pacientes.html";

    }, { 'email':email, 'senha':senha });
}

$("#autenticar").on('submit', (event) => {
    event.preventDefault();

    var email = $("input[name='email']").val();
    var senha = $("input[name='senha']").val();
    autenticar(email, senha);
});

// Redirecionar para login
$(document).ajaxError(function(e, request, s) {
    window.location.href = "/index.html";
});