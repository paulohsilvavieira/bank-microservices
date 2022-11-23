import { AuthenticateUser } from "@/domain/protocols/usecases/auth";
import { Controller } from "@/presenters/contracts/controller";
import { HttpRequest, HttpResponse } from "../contracts/http";
import { ok, badRequest, unauthorized, serverError } from "../helpers/http-status";


export class AuthController implements Controller {
  constructor(private readonly authUserUsecase: AuthenticateUser) { }
  async handler(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const result = await this.authUserUsecase.execute({ accountNumber: httpRequest.body.accountNumber, password: httpRequest.body.password })
      if (result.error) {
        return unauthorized({
          error: result.error.message
        })
      }
      return ok({
        token: result.token
      })
    } catch (error) {
      return serverError({
        error
      })
    }
  }
}
