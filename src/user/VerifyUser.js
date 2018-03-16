// @flow
import User from './User'
import type { $Request, $Response, NextFunction } from 'express'

export const verifyUser = (
  req: $Request,
  res: $Response,
  next: NextFunction
) => {
  const result = User.joiValidate(req.body)
  if (result.error) {
    const errors = []
    for (const item of result.error.details) {
      errors.push({ message: item.message })
    }
    return res.status(401).send({
      errors: errors
    })
  }

  next()
}
