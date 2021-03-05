import moment from "moment";

import { getRepository } from "typeorm";

import { retrieveConnection } from "./conn.utils";

import { Medico } from "../database/entity/Medico";
import { Paciente } from "../database/entity/Paciente";
import { Agendamento } from "../database/entity/Agendamento";
import { Consulta } from "../database/entity/Consulta";

// Factory Médico

export async function getMedicoPelaFactory(): Promise<Medico> {
    return await getRepository(Medico).findOne({ 'status':true });
}

// Factory Paciente

export function getPacienteFactory(uuid:string=null): any {
    let data:any = {
        'nome': 'Paciente Teste',
        'email': 'paciente' + Math.random() + '@prontomed.com',
        'nascimento': '1997-08-10',
        'sexo': 'Masculino',
        'peso': Math.random() * 100,
        'altura': Math.random() * 10,
        'telefone': '(81) 99999-9999'
    };

    // Injetar uuid
    if ((uuid)) data.id = uuid;
    return data;
}

export async function getPacientePelaFactory(): Promise<Paciente> {
    await retrieveConnection();
    let data:any = getPacienteFactory();
    return await getRepository(Paciente).save(data);
}

// Factory Agendamento

function getHorarioAleatorio(): string {
    let tempo = new Date();
    for (let i = 0; i < (Math.random() * 100); ++i) tempo.setMinutes(tempo.getMinutes() * (Math.random() * 1000));
    return moment(tempo).format("YYYY-MM-DD hh:mm:ss");
}

async function getAgendamentoFactory(): Promise<any> {
    await retrieveConnection();

    let horario:string = getHorarioAleatorio();
    let medico:Medico = await getMedicoPelaFactory();
    let paciente:Paciente = await getPacientePelaFactory();

    return {
        'horario': horario,
        'medico': { 'id': medico.id },
        'paciente': { 'id': paciente.id }
    };
}

export async function getAgendamentoPelaFactory(): Promise<Agendamento> {
    let data:any = await getAgendamentoFactory();
    return await getRepository(Agendamento).save(data);
}

// Factory consulta
export async function getConsultaPelaFactor(): Promise<Consulta> {
    let agendamento:Agendamento = await getAgendamentoFactory();
    return await getRepository(Consulta).save({ agendamento: { id:agendamento.id } });
}