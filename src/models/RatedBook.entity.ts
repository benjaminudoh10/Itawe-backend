import { Column, Entity, ManyToOne, PrimaryColumn, Unique } from "typeorm";
import { Book } from "./Book.entity";
import { User } from "./User.entity";

@Entity({ name: "rated_books" })
@Unique("user_book_rating", ["user", "book"])
export class RatedBook {
  @PrimaryColumn("uuid")
  id: string;

  @ManyToOne((type) => User, (user) => user.ratedBooks)
  user: User;

  @ManyToOne((type) => Book)
  book: Book;

  @Column({ nullable: false })
  stars: number;
}
