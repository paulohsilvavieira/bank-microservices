import { AuthenticateUser } from '@/domain/protocols/usecases/auth'
import { MockProxy, mock } from 'jest-mock-extended'
import { AuthController } from '@/presenters/http/controllers/auth-controller'
import { ok, serverError, unauthorized } from '@/presenters/http/helpers/http-status'
import { AuthenticationError } from '@/domain/errors/auth-error'
import { throwError } from '@/tests/domain/mock/throw-error-mock'

describe('AuthController', () => {
  const httpRequest = {
    body: {
      accountNumber: '123456-9',
      password: 'p4$$W0rd'
    }
  }
  let sut: AuthController
  let authUserMock: MockProxy<AuthenticateUser>
  beforeEach(() => {
    authUserMock = mock()
    authUserMock.execute.mockResolvedValue({
      token: 'any_token',
      error: undefined
    })
    sut = new AuthController(authUserMock)
  })
  test('Return 200 With token', async () => {
    const result = await sut.handler(httpRequest)
    expect(result).toEqual(ok({
      token: 'any_token'
    }))
  })
  test('Return status 401', async () => {
    authUserMock.execute.mockResolvedValueOnce({
      token: undefined,
      error: new AuthenticationError()
    })
    const result = await sut.handler(httpRequest)
    expect(result).toEqual(unauthorized({
      error: new AuthenticationError().message
    }))
  })

  test('Return Status 500', async () => {
    jest.spyOn(authUserMock, 'execute').mockImplementationOnce(throwError)
    const result = await sut.handler(httpRequest)
    expect(result).toEqual(serverError({
      error: new Error()
    }))
  })
})
