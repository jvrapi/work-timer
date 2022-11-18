import { WorkTime } from '@prisma/client'
import request from 'supertest'
import { app } from '../../../../app'


describe('[e2e] List all work times', () => {

  const firstDate = new Date()
    
  const secondDate = new Date()
    
  secondDate.setDate(secondDate.getDate() + 1)


  beforeAll(async () => {
    await request(app).post('/work-times').send({
      milliseconds: firstDate.getTime()
    })

     await request(app).post('/work-times').send({
      milliseconds: secondDate.getTime()
    })
  })
  
  it('should be able to list all work times', async () => {
    
    const response = await request(app).get('/work-times')

    expect(response.status).toBe(200)
    expect(response.body.length).toBe(2)

    const workTimesFounded: WorkTime[] = []
      
    response.body.forEach((workTime: WorkTime) => {
      if(
        new Date(workTime.startedAt).getTime() === firstDate.getTime() || 
        new Date(workTime.startedAt).getTime() === secondDate.getTime()
      ){
        workTimesFounded.push(workTime)
      }
    })

    expect(workTimesFounded.length).toBe(2)

  })

  it('should be able to list work times with specific date', async () => {
    const response = await request(app)
    .get('/work-times')
    .query({
      date: firstDate.toISOString().split('T').shift()
    })
    expect(response.status).toBe(200)
    expect(response.body.length).toBe(1)
    expect(new Date(response.body.shift().startedAt).getTime()).toBe(firstDate.getTime())
  })
})