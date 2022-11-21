import { AuthenticationError } from '../../errors/auth-error'

export interface AuthenticateUser {
  execute: (params: AuthenticateUser.Params) => Promise<AuthenticateUser.Result>
}

export namespace AuthenticateUser {
  export type Params={
    accountNumber: string
    password: string
  }
  export type Result ={
    token: string | null
    error: AuthenticationError | null
  }
}
