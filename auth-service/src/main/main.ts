import * as functions from 'firebase-functions'
import { makeAuthController } from './factories/presenters/http/controllers/auth-controller-factory'

export const authService = functions.https.onRequest(async (req, res) => {
  if (req.method === 'POST') {
    const httpRequest = {
      body: req.body,
      params: req.params,
      query: req.query
    }
    const controller = makeAuthController()
    const result = await controller.handler(httpRequest)
    res.status(result.statusCode).json(result.body)
  }
  res.status(400).json({
    msg: 'METHOD INVALID!'
  })
})
