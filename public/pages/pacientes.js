function carregarPacientes() {
    requestAPI('/paciente', 'GET', (response) => {

        let tbody = getTbody(response);
        $("#pacientes tbody").html(tbody);

    });
}

function getTbody(pacientes, tbody = '') {
    if ((pacientes.length <= 0)) tbody = '<tr><td colspan="5" class="text-center">Não há pacientes cadastrados</td></tr>';
    
    // Ordenar (data de cadastro)
    pacientes.sort(function(a, b) {
        var createdA = new Date(a.createdAt);
        var createdB = new Date(b.createdAt);
        return (createdB - createdA);
    });

    
    // Montar tabela
    for (var paciente of pacientes) tbody += getTr(paciente);
    return tbody;
}

function getTr(paciente, tr='') {
    tr += '<td>' + paciente.nome + '</td>';
    tr += '<td class="text-center">' + paciente.nascimento + '</td>';
    tr += '<td class="text-center">' + paciente.sexo + '</td>';
    tr += '<td class="text-center">' + paciente.telefone + '</td>';
    tr += '<td class="text-center"><a href="paciente.html?id=' + paciente.id + '" class="btn btn-sm btn-primary">Detalhes</a></td>';
    return '<tr>' + tr + '</tr>';
}

$(function() {
    carregarPacientes();
});

// Redirecionar para login
$(document).ajaxError(function(e, request, s) {
    window.location.href = "/index.html";
});