import { Router } from 'express'

const routes = Router()

routes.post('/auth', (request, response) => {
   response.json({
    message: 'authenticated'
  })
})


routes.get('/', (request, response) => {
  console.log('aqui')
  response.status(200).send()
})

export { routes }
