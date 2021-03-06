import {MigrationInterface, QueryRunner} from "typeorm";

export class CriarTabelaConsultaAnotacao1614976094243 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `consulta_anotacao` (`id` varchar(36) NOT NULL, `conteudo` text NOT NULL, `consultaId` varchar(36) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `consulta_anotacao` ADD CONSTRAINT `FK_f70411b9deb55be8b97f9e6c321` FOREIGN KEY (`consultaId`) REFERENCES `consulta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `consulta_anotacao` DROP FOREIGN KEY `FK_f70411b9deb55be8b97f9e6c321`");
        await queryRunner.query("DROP TABLE `consulta_anotacao`");
    }

}
