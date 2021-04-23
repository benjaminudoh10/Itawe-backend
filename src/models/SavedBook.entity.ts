import { Entity, ManyToOne, PrimaryColumn, Unique } from "typeorm";
import { Book } from "./Book.entity";
import { User } from "./User.entity";

@Entity({ name: "saved_books" })
@Unique("user_book_saved", ["user", "book"])
export class SavedBook {
  @PrimaryColumn("uuid")
  id: string;

  @ManyToOne((type) => User, (user) => user.savedBooks)
  user: User;

  @ManyToOne((type) => Book)
  book: Book;
}
