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
    const r = await req.jwtVerify<{ id: string }>()
    const user = await server.manager.findOneOrFail(User, r.id)
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

      return server.manager.find(PredictRecord, { userId })
    }
  )

  const addRecordSchema = Type.Object({
    userId: Type.Number(),
    data: Type.String()
  })
  server.put<W<typeof addRecordSchema>>(
    '/record',
    { schema: { body: addRecordSchema } },
    async (req) => {
      const { userId, data } = req.body
      const { user } = req.ctx
      if (userId !== user.id && !user.admin) throw server.httpErrors.forbidden()

      let record = new PredictRecord()
      record.data = data
      record.id = user.id
      record = await server.manager.save(record)
      return record.id
    }
  )

  const deleteRecordSchema = Type.Object({
    id: Type.String()
  })
  server.delete<W<typeof deleteRecordSchema>>(
    '/record',
    { schema: { body: deleteRecordSchema } },
    async (req) => {
      const { user } = req.ctx
      const record = await server.manager.findOneOrFail(
        PredictRecord,
        req.body.id
      )
      if (record.userId !== user.id && !user.admin) {
        throw server.httpErrors.forbidden()
      }
      await server.manager.remove(record)
      return 1
    }
  )

  const updateProfileSchema = Type.Object({
    nickname: Type.String({ minLength: 1, maxLength: 20 }),
    realname: Type.String({ minLength: 1, maxLength: 20 }),
    age: Type.Number({ minimum: 1, maximum: 120 })
  })
  server.patch<W<typeof updateProfileSchema>>(
    '/profile',
    { schema: { body: updateProfileSchema } },
    async (req) => {
      const { user } = req.ctx
      const { nickname, realname, age } = req.body
      if (nickname) {
        user.nickname = nickname
      }
      if (realname) {
        user.realname = realname
      }
      if (age) {
        user.age = age
      }
      await server.manager.save(user)
      return 1
    }
  )
}
