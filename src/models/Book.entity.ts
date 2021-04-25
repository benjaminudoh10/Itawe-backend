import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidv4 } from 'uuid';

import { Author } from "./Author.entity";
import { Order } from "./Order.entity";
import { RatedBook } from "./RatedBook.entity";
import { Review } from "./Review.entity";
import { Voucher } from "./Voucher.entity";

@Entity({ name: "books" })
export class Book {
  @PrimaryColumn("uuid")
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false, default: 0 })
  stock: number;

  @Column({ nullable: false })
  pages: number;

  @Column()
  language: string;

  @Column({ nullable: false })
  image: string;

  @ManyToOne(() => Author, (author) => author.books, { eager: true })
  @JoinColumn()
  author: Author;

  @OneToMany(() => RatedBook, (ratedBook) => ratedBook.book, { cascade: true })
  ratedBooks: RatedBook[];

  @OneToMany(() => Review, (review) => review.book, { cascade: true })
  reviews: Review[];

  @OneToMany(() => Order, (order) => order.book, { cascade: true })
  orders: Order[];

  @OneToOne(() => Voucher, (voucher) => voucher.book)
  voucher: Voucher;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @BeforeInsert()
  addId() {
    this.id = uuidv4();
  }
}
