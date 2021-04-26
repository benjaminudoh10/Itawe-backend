import {MigrationInterface, QueryRunner} from "typeorm";

export class MakeAllowedUsageTimesNullable1619439672714 implements MigrationInterface {
    name = 'MakeAllowedUsageTimesNullable1619439672714'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vouchers" ALTER COLUMN "allowedUsageTimes" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vouchers" ALTER COLUMN "allowedUsageTimes" SET NOT NULL`);
    }

}
