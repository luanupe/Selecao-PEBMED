import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";

import { getHashSenha } from "../../utils/hash.utils";

import { Medico } from "../entity/Medico";

export default class CriarMedico implements Seeder {

    public async run(factory: Factory, connection: Connection): Promise<any> {

      const hash:string = await getHashSenha("123456");

      await connection
        .createQueryBuilder()
        .insert().into(Medico)
        .values([
            { nome:"Médico Teste", email: "medico@prontomed.com", senha:hash, status:true }
        ]).execute();
    }

  }