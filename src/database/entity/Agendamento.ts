import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, OneToMany} from "typeorm";

import { Medico } from "./Medico";
import { Paciente } from "./Paciente";

@Entity()
export class Agendamento {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: 'timestamp' })
    horario: Date;

    @ManyToOne( type => Medico, agendamentos => Agendamento, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' } )
    medico: Medico;

    @ManyToOne( type => Paciente, agendamentos => Agendamento, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' } )
    paciente: Paciente;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

}
