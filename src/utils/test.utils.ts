import moment from "moment";

import { getRepository, Repository } from "typeorm";

import { retrieveConnection } from "./conn.utils";

import { Medico } from "../database/entity/Medico";
import { Paciente } from "../database/entity/Paciente";
import { Agendamento } from "../database/entity/Agendamento";
import { Consulta } from "../database/entity/Consulta";

// Factory Médico

export async function getMedicoPelaFactory(): Promise<Medico> {
    await retrieveConnection();
    return await getRepository(Medico).findOne({ 'status':true });
}

// Factory Paciente

export function getPacienteFactory(uuid:string=null): any {
    const data:any = {
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
    const data:any = getPacienteFactory();
    return await getRepository(Paciente).save(data);
}

// Factory Agendamento

function getHorarioAleatorio(): string {
    const tempo = new Date();
    for (let i = 0; i < (Math.random() * 100); ++i) tempo.setMinutes(tempo.getMinutes() * (Math.random() * 1000));
    return moment(tempo).format("YYYY-MM-DD hh:mm:ss");
}

export async function getAgendamentoFactory(): Promise<any> {
    await retrieveConnection();

    const horario:string = getHorarioAleatorio();
    const medico:Medico = await getMedicoPelaFactory();
    const paciente:Paciente = await getPacientePelaFactory();

    return {
        'horario': horario,
        'medico': { 'id': medico.id },
        'paciente': { 'id': paciente.id }
    };
}

export async function getAgendamentoPelaFactory(): Promise<Agendamento> {
    const data:any = await getAgendamentoFactory();
    const agendamento:Agendamento = await getRepository(Agendamento).save(data);
    return agendamento;
}

// Factory consulta

export async function getConsultaPelaFactory(): Promise<Consulta> {
    const agendamento:Agendamento = await getAgendamentoPelaFactory();
    const repositorio:Repository<Consulta> = getRepository(Consulta);
    const consulta = await repositorio.save({ agendamento: { id:agendamento.id } });
    return consulta;
}