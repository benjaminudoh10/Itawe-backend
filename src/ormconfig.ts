import { ConnectionOptions } from "typeorm";
import { Address } from "./models/Address.entity";
import { Author } from "./models/Author.entity";
import { Book } from "./models/Book.entity";
import { Order } from "./models/Order.entity";
import { RatedBook } from "./models/RatedBook.entity";
import { Review } from "./models/Review.entity";
import { SavedBook } from "./models/SavedBook.entity";
import { User } from "./models/User.entity";
import { Voucher } from "./models/Voucher.entity";

const config: ConnectionOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  synchronize: false,
  logging: process.env.DATABASE_LOGGING === "true",
  entities: [
    User,
    Address,
    Book,
    Author,
    RatedBook,
    SavedBook,
    Review,
    Voucher,
    Order,
  ],
  migrations: ["dist/migrations/*.js"],
  cli: {
    entitiesDir: "src/models",
    migrationsDir: "src/migrations",
  },
};

export = config;
