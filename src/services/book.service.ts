import { getRepository } from "typeorm";
import { BookInterface, FilterParams } from "../interfaces/interfaces";
import { Author } from "../models/Author.entity";
import { Book } from "../models/Book.entity";

export default class BookService {
  private bookRepo = getRepository(Book);

  async createBook(bookData: BookInterface) {
    try {
      let book = this.bookRepo.create(bookData);
      book.author = new Author();
      book.author.id = bookData.authorId;
      book = await this.bookRepo.save(book);

      return book;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async updateBook(bookData: BookInterface) {
    try {
      let book = await this.getBook(bookData.id as string);
      if (!book) {
        throw new Error("Book with provided id does not exist");
      }

      this.bookRepo.merge(book, bookData);
      this.bookRepo.update(
        { id: bookData.id },
        { ...book, author: { id: bookData.authorId } }
      );

      return book;
    } catch (error) {
      throw new Error("Error occured while updating book");
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

    return data;
  }

  async getBook(id: string) {
    const book = await this.bookRepo.findOne({ id });
    if (!book) {
      throw new Error("Book with given id not found");
    }

    return book;
  }
}
