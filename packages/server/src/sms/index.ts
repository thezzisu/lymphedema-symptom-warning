import NodeCache = require('node-cache')
import { logger } from '../util'

const TTL = 5 * 60 // 5 minutes

const cache = new NodeCache({ stdTTL: TTL })

function generateCode() {
  return Math.random().toString().substring(2, 8).padEnd(6, '0')
}

export async function sendCode(tel: string) {
  const code = generateCode()
  cache.set(tel, code)
  logger.info(`Send code ${code} to ${tel}`)
}

export async function verifyCode(tel: string, code: string) {
  const ans = cache.take(tel)
  return ans === code
}
