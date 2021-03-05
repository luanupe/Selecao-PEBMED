import {MigrationInterface, QueryRunner} from "typeorm";

export class CriarTabelaMedico1614975695232 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `medico` (`id` varchar(36) NOT NULL, `nome` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `senha` varchar(255) NOT NULL, `status` tinyint NOT NULL DEFAULT true, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_f8a7547c9734a0979fa972edcb` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_f8a7547c9734a0979fa972edcb` ON `medico`");
        await queryRunner.query("DROP TABLE `medico`");
    }

}
