import { AuthRepository } from '@/infra/postgres/repositories'

export const makeAuthRepository = () => {
  return new AuthRepository()
}
