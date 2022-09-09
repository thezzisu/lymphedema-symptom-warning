import { FastifyPluginAsync } from 'fastify'
import { PredictRecord } from '../entity/Record'
import { User } from '../entity/User'

export const APIAdmin: FastifyPluginAsync = async (server) => {
  server.addHook('preValidation', async (req) => {
    if (!req.ctx.user.admin) throw server.httpErrors.forbidden()
  })

  server.get('/users', async () => {
    const users = await server.manager.find(User)
    return users
  })

  server.get('/export', async () => {
    const records = await server.manager.find(PredictRecord)
    return records
  })
}
