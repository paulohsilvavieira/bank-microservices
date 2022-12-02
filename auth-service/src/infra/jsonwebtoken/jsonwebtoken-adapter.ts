import { TokenGenerator } from '@/domain/protocols/token/token-generator'
import jsonwebtoken from 'jsonwebtoken'
export class JWTAdapter implements TokenGenerator {
  constructor (private readonly secretText: string,
    private readonly expiresIn?: any) {}

  generate (payload: any): { token: string } {
    return {
      token: jsonwebtoken.sign(payload, this.secretText, this.expiresIn ?? '24h')
    }
  }
}
