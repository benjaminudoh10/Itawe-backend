import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Book } from "./Book.entity";
import { User } from "./User.entity";

@Entity({ name: "reviews" })
export class Review {
  @PrimaryColumn("uuid")
  id: string;

  @ManyToOne((type) => User, (user) => user.reviews)
  user: User;

  @ManyToOne((type) => Book)
  book: Book;

  @Column({ nullable: false })
  review: string;
}
