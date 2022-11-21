
export class AuthenticationError extends Error {
  constructor () {
    super('Auth Error - User Invalid')
    this.name = 'AUTH_ERROR_01'
    this.stack = 'AUTH_ERROR'
  }
}
