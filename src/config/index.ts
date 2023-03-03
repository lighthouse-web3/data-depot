import dotenv from 'dotenv'
import Joi from 'joi'

dotenv.config()
const env = process.env.NODE_ENV || 'development'

const baseConfig = {
  env,
  isDev: env === 'development',
  isTest: env === 'testing',
  aws_access_key_id: process.env.AWS_ACCESS_KEY_ID ?? '',
  aws_secret_access_key: process.env.AWS_SECRET_ACCESS_KEY ?? '',
  aws_region: process.env.AWS_REGION ?? '',
  port: process.env.PORT ?? 8000,
}

const envVarsSchema = Joi.object({
  port: Joi.number().default(3000),
  aws_access_key_id: Joi.string().required().messages({
    'any.required': `'AWS_ACCESS_KEY_ID IS MISSING'`,
  }),
  aws_secret_access_key: Joi.string().required().messages({
    'any.required': `'AWS_SECRET_ACCESS_KEY IS MISSING'`,
  }),
  aws_region: Joi.string().required().messages({
    'any.required': `'AWS_REGION IS MISSING'`,
  }),
}).unknown()

const { value: envVars, error } = envVarsSchema.validate(baseConfig)

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

export default baseConfig
