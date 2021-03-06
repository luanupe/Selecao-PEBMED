import { Between, getRepository, Repository,MoreThan } from "typeorm";
import { body } from "express-validator";

import moment from "moment";

import { Agendamento } from "../database/entity/Agendamento";
import { Medico } from "../database/entity/Medico";
import { Paciente } from "../database/entity/Paciente";

/*
    [OK!!!!] Validar se não existe outro agendamento 20 minutos antes do horário escolhido
*/
/*
    [OK] Validar se médico é do tipo JSON
    [OK] Validar se existe médico com o id
*/
/*
    [OK] Validar se paciente é do tipo JSON
    [OK] Validar se existe paciente com o id
*/
export const validacaoAgendamento:any[] = [
    // Validar horário
    body('horario')
        .custom(async (value) => {

            const status:boolean = await validarHorario(value);
            if (!(status)) return Promise.reject("Já existe outro paciente agendado para esse horário");

        }),

    // Validar médico
    body('medico').isObject().withMessage('Dados do médico é inválido')
        .custom(async (value) => {

            const medico = await getRepository(Medico).findOne(value.id);
            if ((medico == null)) return Promise.reject("Médico não encontrado");

        }),

    // Validar paciente
    body('paciente').isObject().withMessage('Dados do paciente é inválido')
    .custom(async (value) => {

        const paciente = await getRepository(Paciente).findOne(value.id);
        if ((paciente == null)) return Promise.reject("Paciente não encontrado");

    })
];

/**
 * FINALMENTE!!!!!
 * Subtrai 20 minutos da data inicial e pega todas as consultas
 * marcadas até a data do início da sessão, se tiver algum registro
 * significa que já tem outras consultas no horário selecionado.
 *
 * Colocar esse tempo no ENV?
 */
async function validarHorario(value):Promise<boolean> {
    // Calcular 20 minutos de duração da sessão
    const end:Date = new Date(value);
    const start:Date = new Date(end);
    start.setMinutes(start.getMinutes() - 20);

    // Formatar para between - AAAAAAAAAAA pq não funcionaaaaaaa??????
    const inicio = moment(start).format("YYYY-MM-DD hh:mm:ss");
    const fim = moment(end).format("YYYY-MM-DD hh:mm:ss");

    // Buscar agendamentos no mesmo horário
    const repositorio:Repository<Agendamento> = getRepository(Agendamento);
    const agendamentos = await repositorio.find({
        where: {
            horario: Between(inicio, fim),
        }
    });

    // Validar quantidade de agendamentos
    return (agendamentos.length <= 0);
}
