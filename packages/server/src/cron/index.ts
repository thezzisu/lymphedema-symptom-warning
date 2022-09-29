import * as schedule from 'node-schedule'
import { DataSource, MoreThan } from 'typeorm'
import { User } from '../entity/User'
import { sendNotification } from '../sms'

export function startCron(ds: DataSource) {
  const manager = ds.manager

  schedule.scheduleJob('* * * * * 6', async () => {
    // Send notification to hish risk users
    // calculate the start of current week
    const now = new Date()
    const startOfWeek = new Date(
      now.getTime() - now.getDay() * 24 * 60 * 60 * 1000
    )
    startOfWeek.setHours(0, 0, 0, 0)

    const target = await manager.find(User, {
      where: {
        isHighRisk: true,
        lastPredictTime: MoreThan(startOfWeek.getTime()),
        noNotification: false
      }
    })
    for (const item of target) {
      try {
        await sendNotification(item.tel, '淋巴水肿症状预警')
      } catch (err) {
        console.log(`Failed to send SMS to ${item.tel}: ${err}`)
      }
    }
  })

  schedule.scheduleJob('* * * 27 * *', async () => {
    // Send notification to low risk users
    // calculate the start of current month
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    startOfMonth.setHours(0, 0, 0, 0)

    const target = await manager.find(User, {
      where: {
        isHighRisk: false,
        lastPredictTime: MoreThan(startOfMonth.getTime()),
        noNotification: false
      }
    })
    for (const item of target) {
      try {
        await sendNotification(item.tel, '淋巴水肿症状预警')
      } catch (err) {
        console.log(`Failed to send SMS to ${item.tel}: ${err}`)
      }
    }
  })
}
