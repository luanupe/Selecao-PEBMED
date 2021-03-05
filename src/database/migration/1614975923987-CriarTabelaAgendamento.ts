import {MigrationInterface, QueryRunner} from "typeorm";

export class CriarTabelaAgendamento1614975923987 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `agendamento` (`id` varchar(36) NOT NULL, `horario` timestamp NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deletedAt` datetime(6) NULL, `medicoId` varchar(36) NULL, `pacienteId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `agendamento` ADD CONSTRAINT `FK_6457e818ae8ca1121eda19459b1` FOREIGN KEY (`medicoId`) REFERENCES `medico`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE");
        await queryRunner.query("ALTER TABLE `agendamento` ADD CONSTRAINT `FK_bdc31f2d4faf6a677a9870dad8e` FOREIGN KEY (`pacienteId`) REFERENCES `paciente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `agendamento` DROP FOREIGN KEY `FK_bdc31f2d4faf6a677a9870dad8e`");
        await queryRunner.query("ALTER TABLE `agendamento` DROP FOREIGN KEY `FK_6457e818ae8ca1121eda19459b1`");
        await queryRunner.query("DROP TABLE `agendamento`");
    }

}
