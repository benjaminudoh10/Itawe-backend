import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { User } from "./User.entity";

@Entity({ name: "addresses" })
export class Address {
  @PrimaryColumn("uuid")
  id: string;

  @Column({})
  address: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @Column()
  postalCode: string;

  @Column()
  phoneNumber: string;

  @OneToOne(() => User, (user) => user.address)
  user: User;

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
