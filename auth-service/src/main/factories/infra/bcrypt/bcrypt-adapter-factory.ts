import { BcryptAdapter } from '@/infra/bcrypt/bcrypt-adapter'

export const makeBcryptAdapter = () => {
  const SALTS_NUMBER = 10
  return new BcryptAdapter(SALTS_NUMBER)
}
