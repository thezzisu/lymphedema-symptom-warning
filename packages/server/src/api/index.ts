import { Type } from '@sinclair/typebox'
import { FastifyPluginAsync } from 'fastify'
import { User } from '../entity/User'
import { sendCode, verifyCode } from '../sms'
import { W } from '../util/t'
import { APIUser } from './user'

export const API: FastifyPluginAsync = async (server) => {
  server.register(APIUser, { prefix: '/user' })

  const verifySchema = Type.Object({
    tel: Type.String()
  })

  server.post<W<typeof verifySchema>>(
    '/verify',
    { schema: { body: verifySchema } },
    async (req) => {
      await sendCode(req.body.tel)
      return 1
    }
  )

  const loginSchema = Type.Object({
    tel: Type.String(),
    code: Type.String()
  })

  server.post<W<typeof loginSchema>>(
    '/login',
    { schema: { body: loginSchema } },
    async (req) => {
      const { tel, code } = req.body
      if (verifyCode(tel, code)) {
        let user = await server.manager.findOne(User, { tel })
        if (!user) {
          user = new User()
          user.tel = tel
          user = await server.manager.save(user)
        }
        const jwt = server.jwt.sign({ id: user.id })
        return { user, jwt }
      }
      throw new Error('Invalid code')
    }
  )
}
