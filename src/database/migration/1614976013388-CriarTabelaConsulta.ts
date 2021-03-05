import {MigrationInterface, QueryRunner} from "typeorm";

export class CriarTabelaConsulta1614976013388 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `consulta` (`id` varchar(36) NOT NULL, `observacao` text NULL, `agendamentoId` varchar(36) NOT NULL, UNIQUE INDEX `REL_ae38f3851c467ac7321ccb9c7f` (`agendamentoId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `consulta` ADD CONSTRAINT `FK_ae38f3851c467ac7321ccb9c7f1` FOREIGN KEY (`agendamentoId`) REFERENCES `agendamento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `consulta` DROP FOREIGN KEY `FK_ae38f3851c467ac7321ccb9c7f1`");
        await queryRunner.query("DROP INDEX `REL_ae38f3851c467ac7321ccb9c7f` ON `consulta`");
        await queryRunner.query("DROP TABLE `consulta`");
    }

}
