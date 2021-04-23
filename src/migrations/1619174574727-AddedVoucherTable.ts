import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedVoucherTable1619174574727 implements MigrationInterface {
    name = 'AddedVoucherTable1619174574727'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vouchers" ("id" uuid NOT NULL, "code" character varying NOT NULL, "discount" integer NOT NULL, "numberOfTimesUsed" integer NOT NULL DEFAULT '0', "allowedUsageTimes" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "bookId" uuid, CONSTRAINT "UQ_efc30b2b9169e05e0e1e19d6dd6" UNIQUE ("code"), CONSTRAINT "REL_f15ae955ac06c7db0577973b46" UNIQUE ("bookId"), CONSTRAINT "PK_ed1b7dd909a696560763acdbc04" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "vouchers" ADD CONSTRAINT "FK_f15ae955ac06c7db0577973b46e" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vouchers" DROP CONSTRAINT "FK_f15ae955ac06c7db0577973b46e"`);
        await queryRunner.query(`DROP TABLE "vouchers"`);
    }

}
