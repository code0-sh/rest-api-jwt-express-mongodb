// @flow
import express from 'express'
import jwt from 'jsonwebtoken'
import randToken from 'rand-token'
import bcrypt from 'bcrypt'
import User from '../user/User'
import Auth from './Auth'
import { config } from '../config'
import { verifyUser } from '../user/VerifyUser'
import type { $Request, $Response } from 'express'

const router = express.Router()

router.post('/login', verifyUser, (req: $Request, res: $Response) => {
  User.findOne(
    {
      name: req.body.name
    },
    (error, user) => {
      if (error) {
        return res.status(500).send({
          errors: [{ message: 'Error on the server.' }]
        })
      }

      if (!user) {
        return res.status(404).send({
          errors: [{ message: 'User not found.' }]
        })
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      )
      if (!passwordIsValid) {
        return res.status(401).send({
          errors: [{ message: 'Authentication failed. Wrong password.' }]
        })
      }

      const token = jwt.sign({ _id: user._id }, config.jwtSecret, {
        expiresIn: config.accessTokenExpirationSeconds
      })
      const refreshToken = randToken.uid(256)

      Auth.update(
        { name: user.name },
        { $set: { refresh_token: refreshToken } },
        { new: true, upsert: true, setDefaultsOnInsert: true },
        (error, auth) => {
          if (error) {
            return res.status(500).send({
              errors: [
                { message: 'There was a problem updating the refresh token.' }
              ]
            })
          }
          res.status(201).send({
            token: token,
            refresh_token: refreshToken,
            message: 'Authentication successfully finished.'
          })
        }
      )
    }
  )
})

router.post('/token', (req: $Request, res: $Response) => {
  Auth.findOne(
    {
      name: req.body.name
    },
    (error, auth) => {
      if (error) {
        return res.status(500).send({
          errors: [
            { message: 'There was a problem finding the refresh token.' }
          ]
        })
      }
      if (!auth) {
        return res.status(404).send({
          errors: [{ message: 'The refresh token has expired.' }]
        })
      }
      if (!auth.is_valid || auth.refresh_token !== req.body.refresh_token) {
        return res.status(401).send({
          errors: [{ message: 'Invalid refresh token.' }]
        })
      }

      User.findOne({ name: auth.name }, (error, user) => {
        if (error) {
          return res.status(500).send({
            errors: [{ message: 'Error on the server.' }]
          })
        }

        if (!user) {
          return res.status(404).send({
            errors: [{ message: 'User not found.' }]
          })
        }

        const token = jwt.sign({ _id: user._id }, config.jwtSecret, {
          expiresIn: config.accessTokenExpirationSeconds
        })
        const refreshToken = randToken.uid(256)

        Auth.update(
          { name: req.body.name },
          { $set: { refresh_token: refreshToken } },
          { new: true, upsert: true, setDefaultsOnInsert: true },
          (error, auth) => {
            if (error) {
              return res.status(500).send({
                errors: [
                  { message: 'There was a problem updating the refresh token.' }
                ]
              })
            }
            res.status(201).send({
              token: token,
              refresh_token: refreshToken,
              message: 'Successful updated of tokens.'
            })
          }
        )
      })
    }
  )
})

export default router
