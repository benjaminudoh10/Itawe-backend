import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedRatedBookTable1619173059352 implements MigrationInterface {
    name = 'AddedRatedBookTable1619173059352'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rated_books" ("id" uuid NOT NULL, "stars" integer NOT NULL, "userId" uuid, "bookId" uuid, CONSTRAINT "user_book_rating" UNIQUE ("userId", "bookId"), CONSTRAINT "PK_fc406fa94053a7260dcd0a76a8b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "rated_books" ADD CONSTRAINT "FK_0cf16af5934220e24cb43ff2fc8" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rated_books" ADD CONSTRAINT "FK_400f8a5a80f94916101dd10550c" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rated_books" DROP CONSTRAINT "FK_400f8a5a80f94916101dd10550c"`);
        await queryRunner.query(`ALTER TABLE "rated_books" DROP CONSTRAINT "FK_0cf16af5934220e24cb43ff2fc8"`);
        await queryRunner.query(`DROP TABLE "rated_books"`);
    }

}
