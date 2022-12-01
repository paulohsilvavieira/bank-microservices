import { AuthenticateUser } from '../usecases/auth'

export interface GetAccountAuthRepo {
  getAccount: (params: Omit<AuthenticateUser.Params, 'password'>) => Promise<{authId: string, password: string | undefined}>
}
