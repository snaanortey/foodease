import { MigrationInterface, QueryRunner } from "typeorm";

export class PostRefactoring1670370223862 implements MigrationInterface {
    name = 'PostRefactoring1670370223862'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "dateOfBirth" date`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "dateOfBirth"`);
    }

}
