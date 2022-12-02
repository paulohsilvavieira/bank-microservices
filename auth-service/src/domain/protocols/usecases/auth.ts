import { AuthenticationError } from '../../errors/auth-error'

export interface AuthenticateUser {
  execute: (params: AuthenticateUser.Params) => Promise<Partial<AuthenticateUser.Result>>
}

export namespace AuthenticateUser {
  export type Params={
    accountNumber: string
    password: string
  }
  export type Result ={
    token: string
    error: AuthenticationError
  }
}
