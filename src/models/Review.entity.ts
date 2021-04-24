import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

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

  @BeforeInsert()
  addId() {
    this.id = uuidv4();
  }
}
