$("#adicionar-agendamento-form").on('submit', (event) => {
    event.preventDefault();

    // Buscar token
    var auth = buscarToken();

    // Buscar dados
    var id = getUrlParameter('id');
    var data = $("input[name='data']").val();
    var hora = $("input[name='hora']").val();
    var horario = (data + ' ' + hora);

    // Enviar request
    requestAPI('/agendamento', 'POST', (response) => {

        $("#consulta-observacao").html(response.observacao);
        $('#adicionar-observacao').modal('hide');

        alert('Agendamento realizado com sucesso!');
        refresh();

    }, { 'horario':horario, 'medico':{ 'id':auth.medicoId }, paciente: { 'id':id } });
});

function excluirPaciente() {
    if ((confirm('Tem certeza que deseja excluir este paciente? Todos os dados pessoais serão perdidos'))) {
        var id = getUrlParameter('id');
        requestAPI('/paciente/' + id, 'DELETE', (response) => {
            window.location.reload(); 
        });
    }
}

function onPaciente(paciente) {
    $("#paciente-href-editar").attr("href", "/paciente-form.html?id=" + paciente.id)
    $("#paciente-nome").html(paciente.nome || '<i>Informação deletada</i>');
    $("#paciente-nascimento").html(getData(paciente.nascimento) || '<i>Informação deletada</i>');
    $("#paciente-sexo").html(paciente.sexo || '<i>Informação deletada</i>');
    $("#paciente-altura").html(paciente.altura ? (paciente.altura + ' m') : '<i>Informação deletada</i>');
    $("#paciente-peso").html(paciente.peso ? (paciente.peso + ' kg') : '<i>Informação deletada</i>');
    $("#paciente-telefone").html(paciente.telefone || '<i>Informação deletada</i>');
    $("#paciente-email").html(paciente.email || '<i>Informação deletada</i>');

    tbody = getTbody(paciente.agendamentos);
    $("#paciente-agendamentos tbody").html(tbody);
}

function getTbody(agendamentos, tbody='') {
    if ((!agendamentos) || (agendamentos.length <= 0)) tbody = '<tr><td colspan="3" class="text-center">Nenhum agendamento encontrado</td></tr>';
    else for (agendamento of agendamentos) tbody += getTr(agendamento);
    return tbody;
}

function getTr(agendamento, tr='') {
    tr += '<td>' + getDataHora(agendamento.horario) + '</td>';
    tr += '<td class="text-center">' + getDataHora(agendamento.createdAt) + '</td>';
    tr += '<td class="text-center">' + (agendamento.consulta ? '<a href="consulta.html?id=' + agendamento.consulta.id + '" class="btn btn-sm btn-primary">Detalhes</a>' : '<i>Aguardando o Paciente</i>') + '</td>';
    return '<tr>' + tr + '</tr>';
}

function carregarPaciente(id) {
    requestAPI('/paciente/' + id, 'GET', (response) => {
        onPaciente(response);
    });
}

function refresh() {
    var id = getUrlParameter('id');
    carregarPaciente(id);
}

$(refresh);