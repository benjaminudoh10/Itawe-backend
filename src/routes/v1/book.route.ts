import { celebrate } from "celebrate";
import { Request, Response, Router } from "express";
import { BookInterface, SavedBookInterface } from "../../interfaces/interfaces";
import { checkAdmin } from "../../middlewares/authorizer";
import BookService from "../../services/book.service";
import { buildResponse, getFilter } from "../../utils/helpers";
import { JWTUser } from "../../utils/JWTUser";
import { bookIdSchema, bookSchema } from "../../utils/validation-schema";

export const bookRoutes = Router();

bookRoutes.post(
  "/",
  celebrate({ body: bookSchema }),
  checkAdmin,
  async (request: Request, response: Response) => {
    const { body } = request;
    const book = await new BookService().createBook(body);
    let data;
    if (book) {
      data = buildResponse(200, true, {
        message: "Book created successfully.",
      });
    } else {
      data = buildResponse(500, false, null, "Error while creating book.");
    }
    return response.status(200).json(data).end();
  }
);

bookRoutes.put(
  "/:bookId",
  celebrate({ body: bookSchema, params: bookIdSchema }),
  checkAdmin,
  async (request: Request, response: Response) => {
    let data;
    const { body } = request;
    const { bookId } = request.params;
    const bookData = {
      ...body,
      id: bookId,
    } as BookInterface;
    try {
      const book = await new BookService().updateBook(bookData);
      data = buildResponse(200, true, book);
    } catch (error) {
      data = buildResponse(500, false, null, `${error.message}`);
    }
    return response.status(200).json(data).end();
  }
);

bookRoutes.get("/", async (request: Request, response: Response) => {
  const filter = getFilter(request);
  const books = await new BookService().getBooks(filter);
  let data = buildResponse(200, true, books);
  return response.status(200).json(data).end();
});

bookRoutes.get("/saved", async (request: Request, response: Response) => {
  const loggedInUser = response.locals.user as JWTUser;
  const savedBooks = await new BookService().getSavedBooks(loggedInUser.id);
  const data = buildResponse(200, true, savedBooks);
  return response.status(200).json(data).end();
});

bookRoutes.get(
  "/:bookId",
  celebrate({ params: bookIdSchema }),
  async (request: Request, response: Response) => {
    const { bookId } = request.params;
    const book = await new BookService().getBook(bookId);
    let data = buildResponse(200, true, book);
    return response.status(200).json(data).end();
  }
);

bookRoutes.post(
  "/:bookId/saved",
  celebrate({ params: bookIdSchema }),
  async (request: Request, response: Response) => {
    const loggedInUser = response.locals.user as JWTUser;
    const { bookId } = request.params;
    const savedBookData = {
      user: loggedInUser.id,
      book: bookId,
    } as SavedBookInterface;
    const saved = await new BookService().saveBook(savedBookData);
    const data = buildResponse(200, true, saved);
    return response.status(200).json(data).end();
  }
);
