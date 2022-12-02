import { HttpRequest, HttpResponse } from './http'

export interface Controller {
  handler: (http: HttpRequest) => Promise<HttpResponse>
}
