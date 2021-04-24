import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { UserRole } from "../interfaces/interfaces";

import { Address } from "./Address.entity";
import { Order } from "./Order.entity";
import { RatedBook } from "./RatedBook.entity";
import { Review } from "./Review.entity";
import { SavedBook } from "./SavedBook.entity";

@Entity({ name: "users" })
export class User {
  @PrimaryColumn("uuid")
  id: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: false, select: false })
  password: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @OneToOne(() => Address, (address) => address.user, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  address: Address;

  @OneToMany(() => RatedBook, (book) => book.user, { cascade: true })
  ratedBooks: RatedBook[];

  @OneToMany(() => SavedBook, (book) => book.user, { cascade: true })
  savedBooks: SavedBook[];

  @OneToMany(() => Review, (review) => review.user, { cascade: true })
  reviews: Review[];

  @OneToMany(() => Order, (order) => order.user, { cascade: true })
  orders: Order[];

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
