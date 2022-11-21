import { Encrypter } from '../protocols/crypto/encrypter'
import { VerifyAccountRepo } from '../protocols/repositories/verify-account-repo'
import { TokenGenerator } from '../protocols/token/token-generator'
import { AuthenticateUser } from '../protocols/usecases/auth'
import { AuthenticationError } from '../errors/auth-error'

export class AuthenticateUserUsecase implements AuthenticateUser {
  constructor (
    private readonly authRepo: VerifyAccountRepo,
    private readonly crypto: Encrypter,
    private readonly token: TokenGenerator) {}

  async execute (params: AuthenticateUser.Params): Promise<AuthenticateUser.Result> {
    const { encryptedText } = this.crypto.encrypt(params.password)

    const { authId } = await this.authRepo.verifyAccount({
      accountNumber: params.accountNumber,
      password: encryptedText
    })

    if (!authId) {
      return {
        token: undefined,
        error: new AuthenticationError()
      }
    }
    const { token } = this.token.generate(authId)

    return {
      token,
      error: undefined
    }
  }
}
