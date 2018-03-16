// @flow
import express from 'express'
import bcrypt from 'bcrypt'
import User from './User'
import auth from '../auth/Passport'
import { verifyUser } from './VerifyUser'
import { decodeHeaderToken } from '../utility/Utility'
import type { $Request, $Response } from 'express'

const router = express.Router()

router.post('/', verifyUser, (req: $Request, res: $Response) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8)

  User.find({ name: req.body.name }, (error, result) => {
    if (error) {
      return res.status(500).send({
        errors: [{ message: 'There was a problem searching for user.' }]
      })
    }
    if (result.length !== 0) {
      return res.status(400).send({
        errors: [{ message: 'User already exists. Please use another name.' }]
      })
    }

    User.create(
      {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      },
      (error, user) => {
        if (error) {
          return res.status(500).send({
            errors: [
              {
                message:
                  'There was a problem adding the information to the database.'
              }
            ]
          })
        }
        res.status(201).send(user)
      }
    )
  })
})

router.delete('/me', auth.authenticate(), (req: $Request, res: $Response) => {
  const decoded = decodeHeaderToken(req)
  User.findOneAndRemove({ _id: decoded._id }, (error, user) => {
    if (error) {
      return res.status(500).send({
        errors: [{ message: 'There was a problem deleting the user.' }]
      })
    }
    if (!user) {
      return res.status(404).send({
        errors: [{ message: 'No user found.' }]
      })
    }
    res.status(200).send({})
  })
})

router.put('/me', auth.authenticate(), (req: $Request, res: $Response) => {
  const decoded = decodeHeaderToken(req)
  User.findOneAndUpdate(
    { _id: decoded._id },
    req.body,
    { new: true },
    (error, user) => {
      if (error) {
        return res.status(500).send({
          errors: [{ message: 'There was a problem updating the user.' }]
        })
      }
      if (!user) {
        return res.status(404).send({
          errors: [{ message: 'No user found.' }]
        })
      }
      res.status(200).send(user)
    }
  )
})

router.get('/me', auth.authenticate(), function (req: $Request, res: $Response) {
  const decoded = decodeHeaderToken(req)
  User.findOne({ _id: decoded._id }, (error, user) => {
    if (error) {
      return res.status(500).send({
        errors: [{ message: 'There was a problem finding the user.' }]
      })
    }
    if (!user) {
      return res.status(404).send({
        errors: [{ message: 'No user found.' }]
      })
    }
    res.status(200).send(user)
  })
})

export default router
