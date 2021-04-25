import { celebrate } from "celebrate";
import { Request, Response, Router } from "express";
import { AuthorInterface } from "../../interfaces/interfaces";
import { checkAdmin } from "../../middlewares/authorizer";
import AuthorService from "../../services/author.service";
import { getFilter } from "../../utils/helpers";
import { authorIdSchema, authorSchema } from "../../utils/validation-schema";

export const authorRoutes = Router();

authorRoutes.post(
  "/",
  celebrate({ body: authorSchema }),
  checkAdmin,
  async (request: Request, response: Response) => {
    const { body } = request;
    const author = await new AuthorService().createAuthor(body);
    return response.status(200).json(author).end();
  }
);

authorRoutes.put(
  "/:authorId",
  celebrate({ body: authorSchema, params: authorIdSchema }),
  checkAdmin,
  async (request: Request, response: Response) => {
    const { body } = request;
    const { authorId } = request.params;
    const authorData = {
      ...body,
      id: authorId,
    } as AuthorInterface;
    const author = await new AuthorService().updateAuthor(authorData);
    return response.status(200).json(author).end();
  }
);

authorRoutes.get("/", async (request: Request, response: Response) => {
  const filter = getFilter(request);
  const authors = await new AuthorService().getAuthors(filter);
  return response.status(200).json(authors).end();
});

authorRoutes.get(
  "/:authorId",
  celebrate({ params: authorIdSchema }),
  async (request: Request, response: Response) => {
    const { authorId } = request.params;
    const author = await new AuthorService().getAuthor(authorId);
    return response.status(200).json(author).end();
  }
);
