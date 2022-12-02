import { AuthenticateUserUsecase } from '@/domain/usecases/authenticate-user-usecase'
import { makeBcryptAdapter } from '../../infra/bcrypt/bcrypt-adapter-factory'
import { makeJWTAdapter } from '../../infra/jsonwebtoken/jwt-adapter-factory'
import { makeAuthRepository } from '../../infra/repositories/auth-repository-factory'

export const makeAuthenticateUserUsecase = () => {
  const authRepoPg = makeAuthRepository()
  const jwtAdapter = makeJWTAdapter()
  const bcryptAdapter = makeBcryptAdapter()
  return new AuthenticateUserUsecase(authRepoPg, bcryptAdapter, jwtAdapter)
}
