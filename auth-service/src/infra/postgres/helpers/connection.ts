/* eslint-disable @typescript-eslint/no-floating-promises */

import path from 'path'
import config from '@/infra/postgres/helpers/ormconfig'
import { ObjectType, Repository, DataSource } from 'typeorm'
import { IBackup, IMemoryDb, newDb } from 'pg-mem'

export class DatabaseConnection {
  private static instance?: DatabaseConnection
  private connection?: DataSource
  private db: IMemoryDb
  private constructor () {}

  static getInstance (): DatabaseConnection {
    if (DatabaseConnection.instance === undefined) DatabaseConnection.instance = new DatabaseConnection()
    return DatabaseConnection.instance
  }

  async connect (): Promise<void> {
    const datasource = new DataSource({
      ...config as any,
      entities: [path.join(__dirname , '../entities/index.{ts,js}')],
      migrations: [path.join(__dirname , '../migrations/*.{ts,js}')],
      migrationsRun: true
    })
    this.connection = await datasource.initialize()
  }

  public async connectTest (entities?: any[]) {
    this.db = newDb()

    this.db.public.registerFunction({
      implementation: () => 'test',
      name: 'current_database'
    })

    this.db.public.registerFunction({
      implementation: () => 'test',
      name: 'version'
    })
    this.connection = this.db.adapters.createTypeormDataSource({
      type: 'postgres',
      entities: entities ?? [path.join(__dirname , '../entities/index.{ts,js}')]

    })
    await this.connection.initialize()
    await this.connection.synchronize()
  }

  async disconnect (): Promise<void> {
    if (this.connection === undefined) throw new Error('Connection Not Found')
    await this.connection.destroy()
    this.connection = undefined
  }

  getRepository<Entity>(entity: ObjectType<Entity>): Repository<Entity> {
    return this.connection.getRepository(entity)
  }

  backUpDatabase (): IBackup {
    return this.db.backup()
  }

  restoreBackUp () {
    this.db.backup().restore()
  }
}
