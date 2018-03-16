// @flow
import mongoose from 'mongoose'
import { config } from '../config'

const AuthSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true, trim: true },
    refresh_token: { type: String, required: true, trim: true },
    is_valid: { type: Boolean, required: true, default: true },
    createdAt: {
      type: Date,
      index: { expires: config.refreshTokenExpirationDays }
    }
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
)

mongoose.model('Auth', AuthSchema)

export default mongoose.model('Auth')
