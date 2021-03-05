import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, DeleteDateColumn, ManyToOne} from "typeorm";
import { Medico } from "./Medico";

@Entity()
export class MedicoToken {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    token: string;

    @Column()
    ip: string;

    @CreateDateColumn()
    createdAt: Date;

    @DeleteDateColumn()
    logoutAt: Date;

    @ManyToOne( type => Medico, tokens => MedicoToken, { nullable: false, onUpdate: 'CASCADE', onDelete: 'RESTRICT' } )
    medico: Medico;

}
