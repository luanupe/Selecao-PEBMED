import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany} from "typeorm";

import {Sexo} from "../../utils/sexo.utils";

import {Agendamento} from "./Agendamento";

@Entity()
export class Paciente {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: true })
    nome: string;

    @Column({ unique: true, nullable: true })
    email: string;

    @Column({ type: 'date', nullable: true })
    nascimento: Date;

    @Column({ type: "enum", enum: Sexo, nullable: true })
    sexo: Sexo

    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
    peso: number;

    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
    altura: number;

    @Column({ nullable: true })
    telefone: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany( type => Agendamento, paciente => Paciente )
    agendamentos: Agendamento[];

}
