import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";

import { Consulta } from "./Consulta";

@Entity()
export class ConsultaAnotacao {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "text" })
    conteudo: string;

    @ManyToOne( type => Consulta, anotacoes => ConsultaAnotacao, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' } )
    consulta: Consulta;

}
