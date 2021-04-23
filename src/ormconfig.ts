import { ConnectionOptions } from 'typeorm';

// import { User } from './models/user.model';

const config: ConnectionOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    logging: process.env.DATABASE_LOGGING === 'true',
    entities: [],
    migrations: ['dist/migrations/*.js'],
    cli: {
        entitiesDir: 'src/models',
        migrationsDir: 'src/migrations',
    },
};

export = config;
