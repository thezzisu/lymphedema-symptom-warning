import { FastifyPluginAsync } from 'fastify'
import { notifyHighRisk, notifyLowRisk } from '../cron'
import { PredictRecord } from '../entity/Record'
import { User } from '../entity/User'

export const APIAdmin: FastifyPluginAsync = async (server) => {
  server.addHook('preValidation', async (req) => {
    if (!req.ctx.user.admin) throw server.httpErrors.forbidden()
  })

  server.get('/export_users', async () => {
    const users = await server.manager.find(User)
    return users
  })

  server.get('/export_records', async () => {
    const records = await server.manager.find(PredictRecord)
    return records
  })

  server.post('/notify_high_risk', async () => {
    await notifyHighRisk(server.manager)
    return 1
  })

  server.post('/notify_low_risk', async () => {
    await notifyLowRisk(server.manager)
    return 1
  })
}
