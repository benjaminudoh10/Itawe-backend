import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedSavedBookTable1619173306435 implements MigrationInterface {
    name = 'AddedSavedBookTable1619173306435'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "saved_books" ("id" uuid NOT NULL, "userId" uuid, "bookId" uuid, CONSTRAINT "user_book_saved" UNIQUE ("userId", "bookId"), CONSTRAINT "PK_f952904f966167e4332bc814e14" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "saved_books" ADD CONSTRAINT "FK_ef21562868cd87c1a6cf7b9ea2d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "saved_books" ADD CONSTRAINT "FK_3b7a78aa942e3922b304455889c" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "saved_books" DROP CONSTRAINT "FK_3b7a78aa942e3922b304455889c"`);
        await queryRunner.query(`ALTER TABLE "saved_books" DROP CONSTRAINT "FK_ef21562868cd87c1a6cf7b9ea2d"`);
        await queryRunner.query(`DROP TABLE "saved_books"`);
    }

}
