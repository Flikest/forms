import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1748278438449 implements MigrationInterface {
    name = 'Init1748278438449'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" ADD CONSTRAINT "UQ_bb3f1ef63734a632b342ec945b0" UNIQUE ("logIn")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" DROP CONSTRAINT "UQ_bb3f1ef63734a632b342ec945b0"`);
    }

}
