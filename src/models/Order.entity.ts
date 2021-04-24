import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { Book } from "./Book.entity";
import { User } from "./User.entity";
import { Voucher } from "./Voucher.entity";

@Entity({ name: "orders" })
export class Order {
  @PrimaryColumn("uuid")
  id: string;

  @Column({ nullable: false })
  quantity: number;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Book, (book) => book.orders)
  @JoinColumn()
  book: Book;

  @ManyToOne(() => Voucher, (voucher) => voucher.orders)
  @JoinColumn()
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
