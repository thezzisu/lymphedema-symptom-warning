import { FastifyPluginAsync } from 'fastify'

export const APIAdmin: FastifyPluginAsync = async (server) => {
  server.addHook('preValidation', async (req) => {
    if (!req.ctx.user.admin) throw server.httpErrors.forbidden()
  })
}
