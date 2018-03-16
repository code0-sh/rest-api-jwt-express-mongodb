// @flow
import mongoose from 'mongoose'
import Joi from 'joi'

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true, trim: true },
    email: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true, trim: true }
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
)

UserSchema.statics.joiValidate = obj => {
  const schema = {
    name: Joi.string()
      .min(2)
      .max(30)
      .required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(8)
      .max(30)
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required()
  }
  return Joi.validate(obj, schema, { abortEarly: false })
}

mongoose.model('User', UserSchema)

export default mongoose.model('User')
