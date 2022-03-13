import NodeCache = require('node-cache')
import { logger } from '../util'
import * as tencentcloud from 'tencentcloud-sdk-nodejs-sms'
import { config } from '../util/config'

const Client = tencentcloud.sms.v20210111.Client
const client = new Client({
  credential: {
    secretId: config.sms.credential.id,
    secretKey: config.sms.credential.key
  },
  region: 'ap-guangzhou',
  profile: {}
})

const TTL = 5 * 60 // 5 minutes

const cache = new NodeCache({ stdTTL: TTL })

function generateCode() {
  return Math.random().toString().substring(2, 8).padEnd(6, '0')
}

export async function sendCode(tel: string) {
  const code = generateCode()
  cache.set(tel, code)
  logger.info(`Send code ${code} to ${tel}`)
  if (config.sms.enabled) {
    await client.SendSms({
      SmsSdkAppId: config.sms.appId,
      PhoneNumberSet: ['+86' + tel],
      SignName: config.sms.signName,
      TemplateId: config.sms.templateId,
      TemplateParamSet: [code]
    })
  }
}

export async function verifyCode(tel: string, code: string) {
  const ans = cache.take(tel)
  return ans === code
}
