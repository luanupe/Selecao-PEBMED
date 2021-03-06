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

    @ManyToOne( () => Medico, (medico:Medico) => medico.tokens, { nullable:false, onUpdate:'CASCADE', onDelete:'RESTRICT' } )
    medico: Medico;

}
