import { ConnectionOptions } from "typeorm";

import { User } from "./models/User.entity";

const config: ConnectionOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  synchronize: false,
  logging: process.env.DATABASE_LOGGING === "true",
  entities: [User],
  migrations: ["dist/migrations/*.js"],
  cli: {
    entitiesDir: "src/models",
    migrationsDir: "src/migrations",
  },
};

export = config;
