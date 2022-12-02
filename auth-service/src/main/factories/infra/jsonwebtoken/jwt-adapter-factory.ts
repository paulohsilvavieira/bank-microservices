import { JWTAdapter } from '@/infra/jsonwebtoken/jsonwebtoken-adapter'

export const makeJWTAdapter = () => {
  const secretPhrase = process.env.JWT_SECRET_PHRASE
  return new JWTAdapter(secretPhrase)
}
