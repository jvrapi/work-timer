import request from 'supertest'
import { app } from '../../../../app'


describe('[e2e] Finish work time', () => {

  


  
  it('should be able to finish a work time', async () => {

    await request(app)
    .post('/work-times')
    .send({
      milliseconds: Date.now()
    })


    const finishedAt = Date.now()
    
    const finishWorkTimeResponse = await request(app)
    .patch('/work-times/finish')
    .send({
      milliseconds: finishedAt
    })

    const listAllWorkTimesResponse = await request(app)
    .get('/work-times')


    expect(finishWorkTimeResponse.status).toBe(200)
    expect(listAllWorkTimesResponse.status).toBe(200)
    expect(Array.isArray(listAllWorkTimesResponse.body)).toBe(true)
    expect(listAllWorkTimesResponse.body).toHaveLength(1)
    expect(listAllWorkTimesResponse.body[0].id).toEqual(finishWorkTimeResponse.body.id)
    expect(new Date(listAllWorkTimesResponse.body[0].finishedAt).getTime()).toEqual(finishedAt)
  })

  it('should not be able to finish a work time', async () => {
    const finishedAt = Date.now()

    const finishWorkTimeResponse = await request(app)
    .patch('/work-times/finish')
    .send({
      milliseconds: finishedAt
    })

    expect(finishWorkTimeResponse.status).toBe(400)
  })

 
})