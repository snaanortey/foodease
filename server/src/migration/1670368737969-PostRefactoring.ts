import { MigrationInterface, QueryRunner } from "typeorm";

export class PostRefactoring1670368737969 implements MigrationInterface {
    name = 'PostRefactoring1670368737969'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying(150) NOT NULL, "passwordHash" character varying NOT NULL, "firstName" character varying(150) NOT NULL, "lastName" character varying(150) NOT NULL, "createdAt" TIMESTAMP NOT NULL, "lastModified" TIMESTAMP NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
