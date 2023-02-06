import { DataSource } from 'typeorm';

import configFile from './config';
export default new DataSource({
  type: 'postgres',
  host: configFile.database.host,
  port: configFile.database.port,
  username: configFile.database.username,
  password: configFile.database.password,
  database: configFile.database.database,
  migrations: [configFile.database.migrations],
  synchronize: false,
  migrationsRun: false,
});
