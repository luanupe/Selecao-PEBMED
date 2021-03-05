import {MigrationInterface, QueryRunner} from "typeorm";

export class CriarTabelaPaciente1614975834515 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `paciente` (`id` varchar(36) NOT NULL, `nome` varchar(255) NULL, `email` varchar(255) NULL, `nascimento` date NULL, `sexo` enum ('Masculino', 'Feminino', 'Não Informado') NULL, `peso` decimal(5,2) NULL, `altura` decimal(5,2) NULL, `telefone` varchar(255) NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deletedAt` datetime(6) NULL, UNIQUE INDEX `IDX_7305cdc6186085e5abaefe643b` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_7305cdc6186085e5abaefe643b` ON `paciente`");
        await queryRunner.query("DROP TABLE `paciente`");
    }

}
