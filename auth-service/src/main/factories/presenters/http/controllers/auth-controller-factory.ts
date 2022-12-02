import { makeAuthenticateUserUsecase } from '@/main/factories/domain/usecases/'
import { AuthController } from '@/presenters/http/controllers/auth-controller'
import { makeDatabaseDecorator } from '../decorators/database-decorator-factory'

export const makeAuthController = () => {
  return makeDatabaseDecorator(new AuthController(makeAuthenticateUserUsecase()))
}
