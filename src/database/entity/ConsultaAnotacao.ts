import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";

import { Consulta } from "./Consulta";

@Entity()
export class ConsultaAnotacao {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "text" })
    conteudo: string;

    @ManyToOne( () => Consulta, (consulta: Consulta) => consulta.anotacoes, { nullable:false, onUpdate:'CASCADE', onDelete:'CASCADE' } )
    consulta: Consulta;

}
