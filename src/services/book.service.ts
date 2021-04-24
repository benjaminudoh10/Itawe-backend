import { getRepository } from "typeorm";
import { BookInterface, FilterParams } from "../interfaces/interfaces";
import { Book } from "../models/Book.entity";
import { buildResponse } from "../utils/helpers";

export default class BookService {
  private bookRepo = getRepository(Book);

  async createBook(bookData: BookInterface) {
    try {
      let book = this.bookRepo.create(bookData);
      book = await this.bookRepo.save(book);

      return buildResponse(200, true, {
        message: "Book created successfully.",
      });
    } catch (error) {
      console.log(error);
      return buildResponse(500, false, null, "Error while adding new book.");
    }
  }

  async updateBook(bookData: BookInterface) {
    try {
      let { data: book } = await this.getBook(bookData.id as string);
      if (!book) {
        return buildResponse(
          404,
          false,
          null,
          "Book with provided id does not exist"
        );
      }

      this.bookRepo.merge(book, bookData);
      book = await this.bookRepo.save(book);

      return buildResponse(200, true, book);
    } catch (error) {
      console.log(error);
      return buildResponse(500, false, null, "Error while updating book.");
    }
  }

  async getBooks(filter: FilterParams) {
    const [books, total] = await this.bookRepo.findAndCount({
      where: {},
      skip: (filter.page - 1) * filter.limit,
      take: filter.limit,
    });
    const data = {
      books,
      meta: {
        total,
        page: filter.page,
        limit: filter.limit,
      },
    };

    return buildResponse(200, true, data);
  }

  async getBook(id: string) {
    const book = await this.bookRepo.findOne({ id });
    if (!book) {
      return buildResponse(
        404,
        false,
        null,
        "Book with given id does not exist"
      );
    }

    return buildResponse(200, true, book);
  }
}
