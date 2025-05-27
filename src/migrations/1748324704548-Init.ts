import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1748324704548 implements MigrationInterface {
    name = 'Init1748324704548'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_bb3f1ef63734a632b342ec945b"`);
        await queryRunner.query(`ALTER TABLE "user_entity" RENAME COLUMN "logIn" TO "login"`);
        await queryRunner.query(`ALTER TABLE "user_entity" RENAME CONSTRAINT "UQ_bb3f1ef63734a632b342ec945b0" TO "UQ_e74b542753b5bf00d728607f81a"`);
        await queryRunner.query(`CREATE INDEX "IDX_e74b542753b5bf00d728607f81" ON "user_entity" ("login") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_e74b542753b5bf00d728607f81"`);
        await queryRunner.query(`ALTER TABLE "user_entity" RENAME CONSTRAINT "UQ_e74b542753b5bf00d728607f81a" TO "UQ_bb3f1ef63734a632b342ec945b0"`);
        await queryRunner.query(`ALTER TABLE "user_entity" RENAME COLUMN "login" TO "logIn"`);
        await queryRunner.query(`CREATE INDEX "IDX_bb3f1ef63734a632b342ec945b" ON "user_entity" ("logIn") `);
    }

}
