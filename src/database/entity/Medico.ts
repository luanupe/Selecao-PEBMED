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

    @OneToMany( type => MedicoToken, medico => Medico )
    tokens: MedicoToken[];

    @OneToMany( type => Agendamento, medico => Medico )
    agendamentos: Agendamento[];

}
