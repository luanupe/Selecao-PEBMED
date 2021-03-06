import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany} from "typeorm";

import { MedicoToken } from "./MedicoToken";
import { Agendamento } from "./Agendamento";

@Entity()
export class Medico {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    nome: string;

    @Column({ unique: true })
    email: string;

    @Column()
    senha: string;

    @Column({ default: () => true })
    status: boolean;

    @CreateDateColumn ()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany( () => MedicoToken, (token:MedicoToken) => token.medico )
    tokens: MedicoToken[];

    @OneToMany( () => Agendamento, (agendamento:Agendamento) => agendamento.medico )
    agendamentos: Agendamento[];

}
