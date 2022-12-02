import { HttpResponse } from '../protocols/http'

export const ok = (body: any): HttpResponse => ({
  statusCode: 200,
  body
})

export const badRequest = (body: any): HttpResponse => ({
  statusCode: 400,
  body
})

export const unauthorized = (body: any): HttpResponse => ({
  statusCode: 401,
  body
})

export const serverError = (body: any): HttpResponse => ({
  statusCode: 500,
  body
})
