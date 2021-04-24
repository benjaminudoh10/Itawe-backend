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

import { Book } from "./Book.entity";
import { Order } from "./Order.entity";

@Entity({ name: "vouchers" })
export class Voucher {
  @PrimaryColumn("uuid")
  id: string;

  @Column({ nullable: false, unique: true })
  code: string;

  @Column({ nullable: false })
  discount: number;

  @Column({ nullable: false, default: 0 })
  numberOfTimesUsed: number;

  @Column()
  allowedUsageTimes: number;

  @OneToOne(() => Book, (book) => book.voucher, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  book: Book;

  @OneToMany(() => Order, (order) => order.voucher, { cascade: true })
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
