import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1748347582565 implements MigrationInterface {
    name = 'Init1748347582565'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_791e05417236f98237ca86b5a1"`);
        await queryRunner.query(`ALTER TABLE "form_fields" DROP COLUMN "field_id"`);
        await queryRunner.query(`ALTER TABLE "form_fields" DROP COLUMN "fieldType"`);
        await queryRunner.query(`CREATE TYPE "public"."form_fields_fieldtype_enum" AS ENUM('text', 'check box', 'radio button')`);
        await queryRunner.query(`ALTER TABLE "form_fields" ADD "fieldType" "public"."form_fields_fieldtype_enum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "form_fields" DROP COLUMN "fieldType"`);
        await queryRunner.query(`DROP TYPE "public"."form_fields_fieldtype_enum"`);
        await queryRunner.query(`ALTER TABLE "form_fields" ADD "fieldType" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "form_fields" ADD "field_id" uuid NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_791e05417236f98237ca86b5a1" ON "form_fields" ("field_id") `);
    }

}
