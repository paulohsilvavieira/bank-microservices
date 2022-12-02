import { GetAccountAuthRepo } from '@/domain/protocols/repositories/get-account-auth-repo'
import { AuthenticateUser } from '@/domain/protocols/usecases/auth'
import { Auth } from '../entities'
import { DatabaseRepository } from '../helpers'

export class AuthRepository extends DatabaseRepository implements GetAccountAuthRepo {
  async getAccount (params: AuthenticateUser.Params): Promise<{authId: string, password: string | undefined}> {
    const { accountNumber, password } = params
    const authRepoPg = this.getRepository(Auth)
    const auth = await authRepoPg.findOneBy({ accountNumber, password })
    if (auth) {
      return {
        authId: auth.id,
        password: auth.password
      }
    }
    return undefined
  }
}
