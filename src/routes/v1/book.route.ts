import { celebrate } from "celebrate";
import { Request, Response, Router } from "express";
import { BookInterface } from "../../interfaces/interfaces";
import { checkAdmin } from "../../middlewares/authorizer";
import BookService from "../../services/book.service";
import { getFilter } from "../../utils/helpers";
import { bookIdSchema, bookSchema } from "../../utils/validation-schema";

export const bookRoutes = Router();

bookRoutes.post(
  "/",
  celebrate({ body: bookSchema }),
  checkAdmin,
  async (request: Request, response: Response) => {
    const { body } = request;
    const book = await new BookService().createBook(body);
    return response.status(200).json(book).end();
  }
);

bookRoutes.put(
  "/:bookId",
  celebrate({ body: bookSchema, params: bookIdSchema }),
  checkAdmin,
  async (request: Request, response: Response) => {
    const { body } = request;
    const { bookId } = request.params;
    const bookData = {
      ...body,
      id: bookId,
    } as BookInterface;
    const book = await new BookService().updateBook(bookData);
    return response.status(200).json(book).end();
  }
);

bookRoutes.get("/", async (request: Request, response: Response) => {
  const filter = getFilter(request);
  const books = await new BookService().getBooks(filter);
  return response.status(200).json(books).end();
});

bookRoutes.get(
  "/:bookId",
  celebrate({ params: bookIdSchema }),
  async (request: Request, response: Response) => {
    const { bookId } = request.params;
    const book = await new BookService().getBook(bookId);
    return response.status(200).json(book).end();
  }
);
