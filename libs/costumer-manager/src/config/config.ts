import path = require("node:path");
import { config } from 'dotenv';
config();
export default {
  database: {
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_PORT),
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    entities: path.join(__dirname, '/../**/*.entity.{js,ts}'),
    migrations: path.join(__dirname, '../database/migrations/*.{ts,js}'),
  },
};
