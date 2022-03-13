import 'dotenv/config'
import { randomBytes } from 'crypto'
import { resolve } from 'path'

export const PORT = parseInt(process.env.PORT) || 9834
export const SECRET = process.env.SECRET || randomBytes(32).toString('hex')
export const ADMIN_TEL = process.env.ADMIN_TEL || ''
export const PUBLIC_DIR =
  process.env.PUBLIC_DIR || resolve(__dirname, '..', 'public')
