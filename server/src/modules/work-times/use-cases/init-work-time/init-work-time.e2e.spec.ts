import request from 'supertest'
import { app } from '../../../../app'

describe('[e2e] Init work time', () => {
  
  it('should be able to create a new work time', async () => {
    const response = await request(app).post('/work-time').send({
      milliseconds: Date.now()
    })

    expect(response.status).toBe(201)
  })
})