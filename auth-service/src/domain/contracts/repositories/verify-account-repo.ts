import { AuthenticateUser } from '../usecases/auth'

export interface VerifyAccountRepo {
  verifyAccount: (params: AuthenticateUser.Params) => Promise<{authId: string | undefined}>
}
