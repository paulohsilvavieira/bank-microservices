import faker from 'faker'
import { MockProxy,mock } from 'jest-mock-extended'
import { AuthentitcationError } from '@/domain/errors/auth-error'
import { Encrypter } from '@/domain/contracts/crypto/encrypter'
import { VerifyAccountRepo } from '@/domain/contracts/repositories/verify-account-repo'
import { TokenGenerator } from '@/domain/contracts/token/token-generator'
import { AuthenticateUserUsecase } from '@/domain/usecases/authenticate-user-usecase'

/**
 * Regra de negocio:
 * o Usuario vai enviar o numero da conta e senha e a api vai retornar um token caso esteja tudo correto
 * caso a senha ou a conta estejam incorretos, retorna um erro de autenticação
 */
const params = {
  accountNumber: faker.finance.account(5),
  password: faker.random.alphaNumeric(40)
}

describe('Authentication User Usecase', () => {
  let sut: AuthenticateUserUsecase
  let authRepo: MockProxy<VerifyAccountRepo>
  let crypto: MockProxy<Encrypter>
  let token: MockProxy<TokenGenerator>

  const authId = faker.datatype.uuid()
  beforeEach(() => {
    authRepo = mock()
    crypto = mock()
    token = mock()
    authRepo.verifyAccount.mockResolvedValue({ authId })
    crypto.encrypt.mockReturnValue({ encryptedText: 's3cr3tT3xt' })
    token.generate.mockReturnValue({ token: 'jwtToken' })
    sut = new AuthenticateUserUsecase(authRepo, crypto, token)
  })

  test('Return token user if accountNumber and Password is correct', async () => {
    const result = await sut.execute(params)

    expect(result).toHaveProperty('token')
    expect(result.token).toEqual('jwtToken')
    expect(result.error).toBeUndefined()
  })
  test('Verify Authentication Repository receive correct params', async () => {
    await sut.execute(params)
    expect(authRepo.verifyAccount).toHaveBeenCalledTimes(1)
    expect(authRepo.verifyAccount).toHaveBeenCalledWith({ accountNumber: params.accountNumber, password: 's3cr3tT3xt' })
  })
  test('Verify encrypter receive correct params', async () => {
    await sut.execute(params)
    expect(authRepo.verifyAccount).toHaveBeenCalledTimes(1)
    expect(authRepo.verifyAccount).toHaveBeenCalledWith({ accountNumber: params.accountNumber, password: 's3cr3tT3xt' })
  })
  test('Return error Authentication if not found user auth', async () => {
    authRepo.verifyAccount.mockResolvedValueOnce({ authId: undefined })
    const result = await sut.execute(params)
    expect(result.error).toEqual(new AuthentitcationError())
    expect(result.token).toBeUndefined()
  })
})
