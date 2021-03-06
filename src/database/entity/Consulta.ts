import {Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn} from "typeorm";
import { Agendamento } from "./Agendamento";

import { ConsultaAnotacao } from "./ConsultaAnotacao";

@Entity()
export class Consulta {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: true, type: "text" })
    observacao: string;

    @OneToOne( () => Agendamento, (agendamento:Agendamento) => agendamento.consulta, { nullable:false, onUpdate:'CASCADE', onDelete:'RESTRICT' } )
    @JoinColumn()
    agendamento: Agendamento;

    @OneToMany( () => ConsultaAnotacao, (anotacao:ConsultaAnotacao) => anotacao.consulta, { eager:true } )
    anotacoes: ConsultaAnotacao[];

}
