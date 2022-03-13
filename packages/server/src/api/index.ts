import { Type } from '@sinclair/typebox'
import { FastifyPluginAsync } from 'fastify'
import { User } from '../entity/User'
import { sendCode, verifyCode } from '../sms'
import { W } from '../util/t'
import { APIUser } from './user'
import { config } from '../util/config'
import axios from 'axios'
import { URLSearchParams } from 'url'

export const API: FastifyPluginAsync = async (server) => {
  server.register(APIUser, { prefix: '/user' })

  const verifySchema = Type.Object({
    tel: Type.String(),
    response: Type.String()
  })

  server.post<W<typeof verifySchema>>(
    '/verify',
    { schema: { body: verifySchema } },
    async (req) => {
      // Verify using google recaptcha
      const { tel, response } = req.body
      const params = new URLSearchParams({
        secret: config.recaptcha.secret,
        response
      })
      const res = await axios.post<{ success: boolean }>(
        'https://www.google.com/recaptcha/api/siteverify',
        params.toString()
      )
      if (!res.data.success) throw server.httpErrors.forbidden()

      await sendCode(tel)
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
