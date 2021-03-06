import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne, ManyToOne} from "typeorm";

import { Medico } from "./Medico";
import { Paciente } from "./Paciente";
import { Consulta } from "./Consulta";

@Entity()
export class Agendamento {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: 'timestamp' })
    horario: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne( () => Medico, { nullable:false, onUpdate:'CASCADE', onDelete:'RESTRICT' } )
    medico: Medico;

    @ManyToOne( () => Paciente, (paciente:Paciente) => paciente.agendamentos, { nullable:false, onUpdate:'CASCADE', onDelete:'RESTRICT' } )
    paciente: Paciente;

    @OneToOne( () => Consulta, (consulta: Consulta) => consulta.agendamento, { nullable:true, eager:true } )
    consulta: Consulta;

}
