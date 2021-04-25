import { getRepository } from "typeorm";
import { AuthorInterface, FilterParams } from "../interfaces/interfaces";
import { Author } from "../models/Author.entity";
import { buildResponse } from "../utils/helpers";

export default class AuthorService {
  private authorRepo = getRepository(Author);

  async createAuthor(authorData: AuthorInterface) {
    try {
      let author = this.authorRepo.create(authorData);
      author = await this.authorRepo.save(author);

      return buildResponse(200, true, {
        message: "Author created successfully.",
      });
    } catch (error) {
      console.log(error);
      return buildResponse(500, false, null, "Error while adding an author.");
    }
  }

  async updateAuthor(authorData: AuthorInterface) {
    try {
      let { data: author } = await this.getAuthor(authorData.id as string);
      if (!author) {
        return buildResponse(
          404,
          false,
          null,
          "Author with provided id does not exist"
        );
      }

      this.authorRepo.merge(author, authorData);
      author = await this.authorRepo.save(author);

      return buildResponse(200, true, author);
    } catch (error) {
      console.log(error);
      return buildResponse(500, false, null, "Error while updating author.");
    }
  }

  async getAuthors(filter: FilterParams) {
    const [authors, total] = await this.authorRepo.findAndCount({
      where: {},
      skip: (filter.page - 1) * filter.limit,
      take: filter.limit,
    });
    const data = {
      authors,
      meta: {
        total,
        page: filter.page,
        limit: filter.limit,
      },
    };

    return buildResponse(200, true, data);
  }

  async getAuthor(id: string) {
    const author = await this.authorRepo.findOne({ id });
    if (!author) {
      return buildResponse(
        404,
        false,
        null,
        "Author with given id does not exist"
      );
    }

    return buildResponse(200, true, author);
  }
}
