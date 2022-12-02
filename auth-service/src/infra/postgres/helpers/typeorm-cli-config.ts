/* eslint-disable import/first */

import dotenv from 'dotenv'
dotenv.config()
import config from './ormconfig'
import { DataSource } from 'typeorm'

import path from 'path'

const datasource = new DataSource({
  type: 'postgres',
  host: config.host,
  port: config.port,
  username: config.username,
  password: config.password,
  database: config.database,
  entities: [path.join(__dirname , '../entities/index.{ts,js}')],
  migrations: [path.join(__dirname , '../migrations/*.{ts,js}')]
})

export default datasource
