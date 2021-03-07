function excluirAgendamento(id) {
    if ((confirm('Tem certeza que deseja excluir este agendamento?'))) {
        requestAPI('/agendamento/' + id, 'DELETE', (response) => {
            window.location.reload(); 
        });
    }
}

function iniciarConsulta(id) {
    if ((confirm('Deseja iniciar a consulta agendada?'))) {
        requestAPI('/consulta/' + id + '/iniciar', 'POST', (response) => {
            window.location.href = "/consulta.html?id=" + response.id;
        }, { 'agendamento': { 'id':id } });
    }
}

function getTbody(agendamentos, tbody = '') {
    if ((agendamentos.length <= 0)) tbody = '<tr><td colspan="4" class="text-center">Não há agendamentos marcados</td></tr>';
    
    // Ordenar (primeiro os não iniciados)
    agendamentos.sort(function(a, b) {
        if ((!a.consulta)) return -1;
        if ((!b.consulta)) return 1;

        var createdA = new Date(a.createdAt);
        var createdB = new Date(b.createdAt);
        return (createdA - createdB);
    });

    // Montar tabela
    for (var agendamento of agendamentos) tbody += getTr(agendamento);
    return tbody;
}

function getTr(agendamento, tr='') {
    var acaoIniciarDetalhar = agendamento.consulta ? '<a href="consulta.html?id=' + agendamento.consulta.id + '" class="btn btn-sm btn-primary">Detalhes</a>'  : '<a onclick="iniciarConsulta(\'' + agendamento.id + '\')" class="btn btn-sm btn-success">Iniciar</a>';
    var acaoExcluir = !agendamento.consulta ? '<a onclick="excluirAgendamento(\'' + agendamento.id + '\')" class="btn btn-sm btn-danger">Excluir</a>' : '';
    
    tr += '<td><a href="paciente.html?id=' + agendamento.paciente.id + '">' + agendamento.paciente.nome + '</a></td>';
    tr += '<td class="text-center">' + getDataHora(agendamento.horario) + '</td>';
    tr += '<td class="text-center">' + getDataHora(agendamento.createdAt) + '</td>';
    tr += '<td class="text-center">' + acaoExcluir + '&nbsp;' + acaoIniciarDetalhar + '</td>';
    return '<tr>' + tr + '</tr>';
}

$(function() {
    requestAPI('/agendamento', 'GET', (response) => {
        let tbody = getTbody(response);
        $("#agendamentos tbody").html(tbody);
    });
});

// Redirecionar para login
$(document).ajaxError(function(e, request, s) {
    window.location.href = "/index.html";
});