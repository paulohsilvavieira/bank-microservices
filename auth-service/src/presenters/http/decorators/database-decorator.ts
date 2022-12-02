import { DatabaseConnection } from '@/infra/postgres/helpers'
import { serverError } from '../helpers/http-status'
import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class DatabaseDecorator implements Controller {
  constructor (private readonly controller: Controller, private readonly database: DatabaseConnection) {}
  async handler (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.database.connect()
    try {
      return await this.controller.handler(httpRequest)
    } catch (error) {
      return serverError(error)
    } finally {
      await this.database.disconnect()
    }
  }
}
