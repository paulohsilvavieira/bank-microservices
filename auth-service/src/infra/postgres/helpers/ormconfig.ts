import dotenv from 'dotenv'
dotenv.config()

export default {
  name: 'wakame-database-connection',
  type: 'postgres',
  host: process.env.POSTGRES_HOST ?? '127.0.0.1',
  port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : 5432,
  username: process.env.POSTGRES_USERNAME ?? 'root',
  password: process.env.POSTGRES_PASSWORD ?? 'admin',
  database: process.env.POSTGRES_DATABASE ?? 'wakame_db',
  synchronize: false,
  migrationsRun: false,
  logging: false
}
