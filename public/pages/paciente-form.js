function carregarPaciente(id) {
    requestAPI('/paciente/' + id, 'GET', (response) => {
        onPaciente(response);
    });
}

function onPaciente(paciente) {
    $("input[name='id']").val(paciente.id);
    $("input[name='nome']").val(paciente.nome);
    $("input[name='email']").val(paciente.email);
    $("input[name='telefone']").val(paciente.telefone);
    $("input[name='nascimento']").val(paciente.nascimento);
    $("input[name='peso']").val(paciente.peso);
    $("input[name='altura']").val(paciente.altura);
    $("select[name='sexo']").val(paciente.sexo);
}

$("#paciente").on('submit', (event) => {
    event.preventDefault();
    var id = getUrlParameter('id');

    // Preparar destino
    var method = (id) ? 'PUT' : 'POST';
    var url = (id) ? '/paciente/' + id : '/paciente';

    // Preparar dados
    var data = {
        'nome': $("input[name='nome']").val(),
        'email': $("input[name='email']").val(),
        'telefone': $("input[name='telefone']").val(),
        'nascimento': $("input[name='nascimento']").val(),
        'sexo': $("select[name='sexo']").val(),
        'peso': $("input[name='peso']").val(),
        'altura': $("input[name='altura']").val()
    };

    // Injetar id
    if ((id)) data['id'] = id;

    // Enviar dados
    requestAPI(url, method, (response) => {
        window.location.href = "/paciente.html?id=" + response.id;
    }, data);
});

$(function() {
    var id = getUrlParameter('id');
    if ((id)) carregarPaciente(id);
});