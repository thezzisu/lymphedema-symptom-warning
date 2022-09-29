import 'reflect-metadata'
import { EntityManager, DataSource } from 'typeorm'
import fastify from 'fastify'
import fastifySensible from '@fastify/sensible'
import fastifyCors from '@fastify/cors'
import fastifyStatic from '@fastify/static'
import fastifyJwt from '@fastify/jwt'
import { logger } from './util'
import { API } from './api'
import { config } from './util/config'
import { User } from './entity/User'
import { PredictRecord } from './entity/Record'
import { startCron } from './cron'

declare module 'fastify' {
  interface FastifyInstance {
    db: DataSource
    manager: EntityManager
  }
}

async function init(conn: DataSource) {
  let user = await conn.manager.findOne(User, { where: { admin: true } })
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

const dataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true,
  logging: false,
  entities: [User, PredictRecord]
})

dataSource
  .initialize()
  .then(async (ds) => {
    logger.info('Database connected')
    await init(ds)

    const server = fastify({ logger })
    await server.register(fastifyCors, { origin: true, credentials: true })
    await server.register(fastifySensible)
    if (config.server.static) {
      await server.register(fastifyStatic, { root: config.server.static })
    }
    await server.register(fastifyJwt, { secret: config.server.secret })
    await server.register(API)

    server.decorate('db', ds)
    server.decorate('manager', ds.manager)
    await server.listen({
      port: config.server.port,
      host: '127.0.0.1'
    })
    startCron(ds)
  })
  .catch((error) => console.log(error))
