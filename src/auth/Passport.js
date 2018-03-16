// @flow
import passport from 'passport'
import passportJWT from 'passport-jwt'
import User from '../user/User'
import { config } from '../config'

const ExtractJwt = passportJWT.ExtractJwt
const Strategy = passportJWT.Strategy
const params = {
  secretOrKey: config.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

export default (function (): { initialize: Function, authenticate: Function } {
  const strategy = new Strategy(params, (payload, done) => {
    User.findOne({ _id: payload._id }, (error, user) => {
      if (error) {
        return done(error, false)
      }
      if (user) {
        return done(null, {
          _id: user._id
        })
      } else {
        return done(null, false)
      }
    })
  })
  passport.use(strategy)

  return {
    initialize: (): void => {
      return passport.initialize()
    },
    authenticate: (): void => {
      return passport.authenticate('jwt', config.jwtSession)
    }
  }
})()
