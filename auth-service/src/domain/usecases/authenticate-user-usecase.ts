import { GetAccountAuthRepo } from '../protocols/repositories/get-account-auth-repo'
import { TokenGenerator } from '../protocols/token/token-generator'
import { AuthenticateUser } from '../protocols/usecases/auth'
import { AuthenticationError } from '../errors/auth-error'
import { EncrypterCompare } from '../protocols/bcrypt'

export class AuthenticateUserUsecase implements AuthenticateUser {
  constructor (
    private readonly authRepo: GetAccountAuthRepo,
    private readonly bcrypt: EncrypterCompare,
    private readonly jwtToken: TokenGenerator) {}

  async execute (params: AuthenticateUser.Params): Promise<Partial<AuthenticateUser.Result>> {
    const authUser = await this.authRepo.getAccount({ accountNumber: params.accountNumber })

    if (!authUser) {
      return {
        error: new AuthenticationError()
      }
    }

    const isCorrectPassword = this.bcrypt.compare({
      hash: authUser.password,
      plainText: params.password
    })

    if (isCorrectPassword) {
      const { token } = this.jwtToken.generate(authUser.authId)
      return {
        token
      }
    }
    return {
      error: new AuthenticationError()
    }
  }
}
