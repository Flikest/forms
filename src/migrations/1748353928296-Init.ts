import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1748353928296 implements MigrationInterface {
    name = 'Init1748353928296'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_f50c2b9d77864bc6bc3b875929"`);
        await queryRunner.query(`ALTER TABLE "form_fields" RENAME COLUMN "uuid" TO "id"`);
        await queryRunner.query(`ALTER TABLE "form_fields" RENAME CONSTRAINT "PK_f50c2b9d77864bc6bc3b8759294" TO "PK_dc4b73290f2926c3a7d7c92d1e1"`);
        await queryRunner.query(`ALTER SEQUENCE "form_fields_uuid_seq" RENAME TO "form_fields_id_seq"`);
        await queryRunner.query(`ALTER TABLE "form_fields" DROP CONSTRAINT "PK_dc4b73290f2926c3a7d7c92d1e1"`);
        await queryRunner.query(`ALTER TABLE "form_fields" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "form_fields" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "form_fields" ADD CONSTRAINT "PK_dc4b73290f2926c3a7d7c92d1e1" PRIMARY KEY ("id")`);
        await queryRunner.query(`CREATE INDEX "IDX_dc4b73290f2926c3a7d7c92d1e" ON "form_fields" ("id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_dc4b73290f2926c3a7d7c92d1e"`);
        await queryRunner.query(`ALTER TABLE "form_fields" DROP CONSTRAINT "PK_dc4b73290f2926c3a7d7c92d1e1"`);
        await queryRunner.query(`ALTER TABLE "form_fields" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "form_fields" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "form_fields" ADD CONSTRAINT "PK_dc4b73290f2926c3a7d7c92d1e1" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER SEQUENCE "form_fields_id_seq" RENAME TO "form_fields_uuid_seq"`);
        await queryRunner.query(`ALTER TABLE "form_fields" RENAME CONSTRAINT "PK_dc4b73290f2926c3a7d7c92d1e1" TO "PK_f50c2b9d77864bc6bc3b8759294"`);
        await queryRunner.query(`ALTER TABLE "form_fields" RENAME COLUMN "id" TO "uuid"`);
        await queryRunner.query(`CREATE INDEX "IDX_f50c2b9d77864bc6bc3b875929" ON "form_fields" ("uuid") `);
    }

}
