// @flow
import jwt from 'jsonwebtoken'
import { config } from '../config'
import type { $Request } from 'express'

export const decodeHeaderToken: Function = (req: $Request) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'bearer'
  ) {
    const token = req.headers.authorization.split(' ')[1]
    return jwt.verify(token, config.jwtSecret)
  }
  return null
}
