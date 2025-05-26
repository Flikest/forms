import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1748275154631 implements MigrationInterface {
    name = 'Init1748275154631'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "logIn" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b54f8ea623b17094db7667d820" ON "user_entity" ("id") `);
        await queryRunner.query(`CREATE INDEX "IDX_bb3f1ef63734a632b342ec945b" ON "user_entity" ("logIn") `);
        await queryRunner.query(`CREATE TABLE "forms" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "creator_id" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_ba062fd30b06814a60756f233da" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ba062fd30b06814a60756f233d" ON "forms" ("id") `);
        await queryRunner.query(`CREATE INDEX "IDX_bfa904bc8c5ad6bcb28e488e25" ON "forms" ("title") `);
        await queryRunner.query(`CREATE TABLE "form_fields" ("uuid" SERIAL NOT NULL, "name" character varying NOT NULL, "fieldType" character varying NOT NULL, "is_required" boolean NOT NULL DEFAULT false, "field_id" uuid NOT NULL, "value" character varying NOT NULL, "form_id" uuid, CONSTRAINT "PK_f50c2b9d77864bc6bc3b8759294" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f50c2b9d77864bc6bc3b875929" ON "form_fields" ("uuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_791e05417236f98237ca86b5a1" ON "form_fields" ("field_id") `);
        await queryRunner.query(`CREATE TABLE "answers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "form_id" uuid NOT NULL, "defendant_id" uuid NOT NULL, "fields_id" uuid NOT NULL, "answer" character varying NOT NULL, CONSTRAINT "PK_9c32cec6c71e06da0254f2226c6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9c32cec6c71e06da0254f2226c" ON "answers" ("id") `);
        await queryRunner.query(`ALTER TABLE "form_fields" ADD CONSTRAINT "FK_c2076d2b47add1aaa07608e0cf2" FOREIGN KEY ("form_id") REFERENCES "forms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "form_fields" DROP CONSTRAINT "FK_c2076d2b47add1aaa07608e0cf2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9c32cec6c71e06da0254f2226c"`);
        await queryRunner.query(`DROP TABLE "answers"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_791e05417236f98237ca86b5a1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f50c2b9d77864bc6bc3b875929"`);
        await queryRunner.query(`DROP TABLE "form_fields"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bfa904bc8c5ad6bcb28e488e25"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ba062fd30b06814a60756f233d"`);
        await queryRunner.query(`DROP TABLE "forms"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bb3f1ef63734a632b342ec945b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b54f8ea623b17094db7667d820"`);
        await queryRunner.query(`DROP TABLE "user_entity"`);
    }

}
