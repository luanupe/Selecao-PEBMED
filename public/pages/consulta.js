$("#adicionar-observacao-form").on('submit', (event) => {
    event.preventDefault();

    // Buscar dados
    var id = getUrlParameter('id');
    var observacao = $("textarea[name=observacao]").val();

    // Enviar request
    requestAPI('/consulta/' + id, 'PUT', (response) => {

        $("#consulta-observacao").html(response.observacao);
        $('#adicionar-observacao').modal('hide');
        alert('Observação atualizada com sucesso!');

    }, { 'observacao':observacao });
});

$("#adicionar-anotacao-form").on('submit', (event) => {
    event.preventDefault();

    // Buscar dados
    var id = getUrlParameter('id');
    var conteudo = $("textarea[name=conteudo]").val();

    // Enviar request
    requestAPI('/consulta/' + id + '/anotacao', 'POST', (response) => {

        // Atualizar dados em tela
        refresh();

        // Alertar
        $('#adicionar-anotacao').modal('hide');
        alert('Anotação adicionada com sucesso!');

    }, { 'conteudo':conteudo, 'consulta':{ 'id':id } });
});

function onConsulta(consulta) {
    $("#textarea[name='observacao']").val(consulta.observacao);
    $("#consulta-observacao").html(consulta.observacao || '<i>Nenhuma observação</i>');
    $("#consulta-paciente-nome").html('<a href="paciente.html?id=' + consulta.agendamento.paciente.id + '">' + consulta.agendamento.paciente.nome + '</a>');
    $("#consulta-agendamento-horario").html(getDataHora(consulta.agendamento.horario));
    $("#consulta-agendamento-createdat").html(getDataHora(consulta.agendamento.createdAt));

    let ul = getUl(consulta.anotacoes);
    $("#consulta-anotacoes").html(ul);
}

function getUl(anotacoes, ul='') {
    if ((!anotacoes) || (anotacoes.length <= 0)) ul = '<li>Nenhuma anotação registrada</li>';
    else for (anotacao of anotacoes) ul += getLi(anotacao);
    return ul;
}

function getLi(anotacao) {
    return '<li>' + anotacao.conteudo + '</li>';
}

function carregarConsulta(id) {
    requestAPI('/consulta/' + id, 'GET', (response) => {
        onConsulta(response);
    });
}

function refresh() {
    var id = getUrlParameter('id');
    carregarConsulta(id);
}

$(refresh);