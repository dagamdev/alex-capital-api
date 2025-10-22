export const BOT_TOKEN = process.env.BOT_TOKEN ?? ''
export const DEV_BOT_TOKEN = process.env.DEV_BOT_TOKEN ?? ''
export const JWT_SECRET = process.env.JWT_SECRET ?? 'secret-key'
export const ORIGINS = (process.env.DOMAINS ?? '').split(',')
