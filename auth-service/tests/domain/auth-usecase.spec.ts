import faker from 'faker'
import { MockProxy,mock } from 'jest-mock-extended'
import { AuthenticationError } from '@/domain/errors/auth-error'
import { GetAccountAuthRepo } from '@/domain/protocols/repositories/get-account-auth-repo'
import { TokenGenerator } from '@/domain/protocols/token/token-generator'
import { AuthenticateUserUsecase } from '@/domain/usecases/authenticate-user-usecase'
import { EncrypterCompare } from '@/domain/protocols/bcrypt'

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
  let authRepo: MockProxy<GetAccountAuthRepo>
  let crypto: MockProxy<EncrypterCompare>
  let token: MockProxy<TokenGenerator>

  const authId = faker.datatype.uuid()
  const databasePassword = faker.internet.password(32)
  beforeEach(() => {
    authRepo = mock()
    crypto = mock()
    token = mock()
    authRepo.getAccount.mockResolvedValue({ authId, password: databasePassword })
    crypto.compare.mockReturnValue(true)
    token.generate.mockReturnValue({ token: 'jwtToken' })
    sut = new AuthenticateUserUsecase(authRepo, crypto, token)
  })

  test('Return token user if accountNumber and Password is correct', async () => {
    const result = await sut.execute(params)

    expect(result).toHaveProperty('token')
    expect(result.token).toEqual('jwtToken')
    expect(result.error).toBeUndefined()
  })
  test('Should verify authentication repository getAccount receive correct params', async () => {
    await sut.execute(params)
    expect(authRepo.getAccount).toHaveBeenCalledTimes(1)
    expect(authRepo.getAccount).toHaveBeenCalledWith({ accountNumber: params.accountNumber })
  })

  test('Should verify EncrypterCompare receive correct params', async () => {
    await sut.execute(params)
    expect(crypto.compare).toHaveBeenCalledTimes(1)
    expect(crypto.compare).toHaveBeenCalledWith({ hash: databasePassword, plainText: params.password })
  })

  test('Should return error Authentication if not found user auth', async () => {
    authRepo.getAccount.mockResolvedValueOnce(undefined)
    const result = await sut.execute(params)
    expect(result.error).toEqual(new AuthenticationError())
    expect(result.token).toBeUndefined()
  })

  test('Should return error Authentication if password is incorrect', async () => {
    crypto.compare.mockReturnValueOnce(false)
    const result = await sut.execute(params)
    expect(result.error).toEqual(new AuthenticationError())
    expect(result.token).toBeUndefined()
  })
})
