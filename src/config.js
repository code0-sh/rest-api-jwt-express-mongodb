// @flow
import dotenv from 'dotenv'

dotenv.config()
if (process.env.NODE_SECRET == null) throw new Error('Missing APP_SECRET')

const databaseName = 'sample'

export const config = {
  jwtSecret: process.env.NODE_SECRET,
  jwtSession: {
    session: false
  },
  database: `mongodb://localhost/${databaseName}`,
  accessTokenExpirationSeconds:
    Number(process.env.NODE_ACCESS_TOKEN_EXPIRATION_SECONDS) || 300,
  refreshTokenExpirationDays:
    process.env.NODE_REFRESH_TOKEN_EXPIRATION_DAYS || '14d'
}
