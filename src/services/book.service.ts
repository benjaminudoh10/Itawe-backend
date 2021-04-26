import { getRepository } from "typeorm";
import {
  BookInterface,
  BookReviewInterface,
  FilterParams,
  SavedBookInterface,
} from "../interfaces/interfaces";
import { Book } from "../models/Book.entity";
import { Review } from "../models/Review.entity";
import { SavedBook } from "../models/SavedBook.entity";

export default class BookService {
  private bookRepo = getRepository(Book);
  private savedBookRepo = getRepository(SavedBook);
  private reviewRepo = getRepository(Review);

  async createBook(bookData: BookInterface) {
    try {
      let book = this.bookRepo.create(bookData);
      book.author = bookData.authorId as any;
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
        { ...book, author: bookData.authorId as any }
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

  async saveBook(savedBookData: SavedBookInterface) {
    const data = {
      user: savedBookData.user as any,
      book: savedBookData.book as any,
    };
    let saved = await this.savedBookRepo.findOne(data);
    if (saved) {
      this.savedBookRepo.remove(saved);
      return {
        message: "Book successfully removed from saved list",
      };
    } else {
      saved = this.savedBookRepo.create(data);
      await this.savedBookRepo.save(saved);
      return {
        message: "Book successfully added to saved list",
      };
    }
  }

  async getSavedBooks(userId: string) {
    const savedBooks = await this.savedBookRepo.find({
      where: {
        user: userId,
      },
      relations: ["book"],
    });

    const books = savedBooks.map((saved) => saved.book);

    return books;
  }

  async addReview(reviewData: BookReviewInterface) {
    const data = {
      user: reviewData.user as any,
      book: reviewData.book as any,
      review: reviewData.review,
    };

    let review = this.reviewRepo.create(data);
    await this.reviewRepo.save(review);
    return {
      message: "Review successfully added to book.",
    };
  }

  async getBookReviews(bookId: string, filter: FilterParams) {
    const [reviews, total] = await this.reviewRepo.findAndCount({
      where: { book: bookId },
      skip: (filter.page - 1) * filter.limit,
      take: filter.limit,
    });
    const data = {
      reviews,
      meta: {
        total,
        page: filter.page,
        limit: filter.limit,
      },
    };

    return data;
  }
}
