import { body } from "express-validator";
import { getRepository, Repository } from "typeorm";

import { Agendamento } from "../database/entity/Agendamento";
import { Consulta } from "../database/entity/Consulta";

/*
    [OK] Validar se agendamento é do tipo JSON
    [OK] Validar se existe um agendamento com o id
    [OK] Validar se já não existe uma consulta com o agendamento em questão
*/
export const validacaoIniciarConsulta:any[] = [
    // Validar agendamento
    body('agendamento')
        .isObject().withMessage('As informações de agendamento não são válidas')
        .custom(async (value) => {

            // Checar se o agendamento existe
            const agendamento = await getRepository(Agendamento).findOne(value.id);
            if ((agendamento == null)) return Promise.reject("O agendamento informado não existe.");

            // Checar se já existe uma consulta para o agentamento
            const consulta = await getRepository(Consulta).findOne(value.id);
            if ((consulta != null)) return Promise.reject("Já existe uma consulta para este agendamento.");

        })

];

/*
    [OK] Validar se o campo de observações está preenchido
*/
export const validacaoObservacao:any[] = [
    // Validar campo de email
    body('observacao')
        .isLength({ min:1 }).withMessage('O campo de observações não pode ficar em branco')
];

/*
    [OK] Validar se o campo de anotações está preenchido
*/
/*
    [OK] Validar se o campo de consultas está preenchido
*/
export const validacaoAnotacao:any[] = [
    // Validar campo de email
    body('conteudo')
        .isLength({ min:1 }).withMessage('O campo de anotação não pode ficar em branco'),
    
    // Validar agendamento
    body('consulta')
        .isObject().withMessage('As informações de consulta não são válidas')
        .custom(async (value) => {

            // Checar se a consulta existe na base
            const consulta = await getRepository(Consulta).findOne(value.id);
            if ((consulta == null)) return Promise.reject("A consutla informada não existe");

        })
];
