import { Static, Type } from '@sinclair/typebox'
import { FastifyPluginAsync } from 'fastify'
import { PredictRecord } from '../entity/Record'
import { User } from '../entity/User'
import { W } from '../util/t'
import { APIAdmin } from './admin'

declare module 'fastify' {
  interface FastifyRequest {
    ctx: {
      user: User
    }
  }
}

export const APIUser: FastifyPluginAsync = async (server) => {
  server.addHook('preValidation', async (req) => {
    const r = await req.jwtVerify<{ id: number }>()
    const user = await server.manager.findOneOrFail(User, {
      where: { id: r.id }
    })
    req.ctx = { user }
  })

  server.register(APIAdmin, { prefix: '/admin' })

  const getRecordsSchema = Type.Object({
    userId: Type.Number()
  })
  server.get<{ Querystring: Static<typeof getRecordsSchema> }>(
    '/records',
    { schema: { querystring: getRecordsSchema } },
    async (req) => {
      const { userId } = req.query
      const { user } = req.ctx
      if (userId !== user.id && !user.admin) throw server.httpErrors.forbidden()

      return server.manager.find(PredictRecord, { where: { userId } })
    }
  )

  const addRecordSchema = Type.Object({
    userId: Type.Number(),
    data: Type.String()
  })
  server.post<W<typeof addRecordSchema>>(
    '/record',
    { schema: { body: addRecordSchema } },
    async (req) => {
      const { userId, data } = req.body
      const { user } = req.ctx
      if (userId !== user.id && !user.admin) throw server.httpErrors.forbidden()

      let record = new PredictRecord()
      record.data = data
      record.userId = userId
      record = await server.manager.save(record)
      return record.id
    }
  )

  const deleteRecordSchema = Type.Object({
    id: Type.Number()
  })
  server.delete<W<typeof deleteRecordSchema>>(
    '/record',
    { schema: { body: deleteRecordSchema } },
    async (req) => {
      const { user } = req.ctx
      const record = await server.manager.findOneOrFail(PredictRecord, {
        where: { id: req.body.id }
      })
      if (record.userId !== user.id && !user.admin) {
        throw server.httpErrors.forbidden()
      }
      await server.manager.remove(record)
      return 1
    }
  )

  const getProfileSchema = Type.Object({
    userId: Type.Number()
  })
  server.get<{ Querystring: Static<typeof getProfileSchema> }>(
    '/profile',
    { schema: { querystring: getProfileSchema } },
    async (req) => {
      const { userId } = req.query
      const { user } = req.ctx
      if (userId !== user.id && !user.admin) throw server.httpErrors.forbidden()

      return server.manager.findOne(User, {
        where: { id: userId }
      })
    }
  )

  const updateProfileSchema = Type.Object({
    nickname: Type.String({ minLength: 1, maxLength: 20 }),
    realname: Type.String({ minLength: 1, maxLength: 20 }),
    age: Type.Number({ minimum: 1, maximum: 120 }),
    isHighRisk: Type.Boolean()
  })
  server.patch<W<typeof updateProfileSchema>>(
    '/profile',
    { schema: { body: updateProfileSchema } },
    async (req) => {
      const { user } = req.ctx
      const { nickname, realname, age, isHighRisk } = req.body
      user.nickname = user.nickname ?? nickname
      user.realname = realname ?? user.realname
      user.age = age ?? user.age
      user.isHighRisk = isHighRisk ?? user.isHighRisk
      await server.manager.save(user)
      return 1
    }
  )
}
