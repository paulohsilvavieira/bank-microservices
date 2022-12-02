import { DatabaseConnection } from '@/infra/postgres/helpers'
import { DatabaseDecorator } from '@/presenters/http/decorators/database-decorator'
import { Controller } from '@/presenters/http/protocols/controller'

export const makeDatabaseDecorator = (controller: Controller) => {
  const database = DatabaseConnection.getInstance()
  return new DatabaseDecorator(controller, database)
}
