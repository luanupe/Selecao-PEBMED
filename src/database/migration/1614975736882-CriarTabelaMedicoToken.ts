import {MigrationInterface, QueryRunner} from "typeorm";

export class CriarTabelaMedicoToken1614975736882 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `medico_token` (`id` varchar(36) NOT NULL, `token` varchar(255) NOT NULL, `ip` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `logoutAt` datetime(6) NULL, `medicoId` varchar(36) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `medico_token` ADD CONSTRAINT `FK_51cc5a065367dab79d586f605de` FOREIGN KEY (`medicoId`) REFERENCES `medico`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `medico_token` DROP FOREIGN KEY `FK_51cc5a065367dab79d586f605de`");
        await queryRunner.query("DROP TABLE `medico_token`");
    }

}
