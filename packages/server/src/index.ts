import 'reflect-metadata'
import { createConnection, Connection, EntityManager } from 'typeorm'
import fastify from 'fastify'
import fastifySensible from 'fastify-sensible'
import fastifyCors from 'fastify-cors'
import fastifyStatic from 'fastify-static'
import fastifyJwt from 'fastify-jwt'
import { logger } from './util'
import { API } from './api'
import { User } from './entity/User'
import { config } from './util/config'

declare module 'fastify' {
  interface FastifyInstance {
    db: Connection
    manager: EntityManager
  }
}

async function init(conn: Connection) {
  let user = await conn.manager.findOne(User, { admin: true })
  if (!user) {
    logger.info('Creating admin user')
    user = new User()
    user.tel = config.init.adminTel
    user.nickname = 'admin'
    user.realname = 'admin'
    user.admin = true
    user = await conn.manager.save(user)
    logger.info(`Created admin user id = ${user.id}`)
  }
}

createConnection()
  .then(async (connection) => {
    logger.info('Database connected')
    await init(connection)

    const server = fastify({ logger })
    await server.register(fastifyCors, { origin: true, credentials: true })
    await server.register(fastifySensible)
    if (config.server.static) {
      await server.register(fastifyStatic, { root: config.server.static })
    }
    await server.register(fastifyJwt, { secret: config.server.secret })
    await server.register(API)

    server.decorate('db', connection)
    server.decorate('manager', connection.manager)
    await server.listen(config.server.port, '127.0.0.1')
  })
  .catch((error) => console.log(error))
