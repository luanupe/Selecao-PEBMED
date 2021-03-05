import {Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn} from "typeorm";
import { Agendamento } from "./Agendamento";

import { ConsultaAnotacao } from "./ConsultaAnotacao";

@Entity()
export class Consulta {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: true, type: "text" })
    observacao: string;

    @OneToOne( type=>Agendamento, { onUpdate: 'CASCADE', onDelete: 'RESTRICT', nullable: false } )
    @JoinColumn()
    agendamento: Agendamento;

    @OneToMany( type => ConsultaAnotacao, consulta => Consulta )
    anotacoes: ConsultaAnotacao[];

}
