import { AuthenticateUser } from '@/domain/protocols/usecases/auth'
import { Controller } from '@/presenters/http/protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { ok, unauthorized, serverError } from '../helpers/http-status'

export class AuthController implements Controller {
  constructor (private readonly authUserUsecase: AuthenticateUser) { }
  async handler (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { accountNumber, password } = httpRequest.body
      const { error, token } = await this.authUserUsecase.execute({ accountNumber, password })

      if (error) {
        return unauthorized({
          error: error.message
        })
      }

      return ok({
        token
      })
    } catch (error) {
      return serverError({
        error
      })
    }
  }
}
