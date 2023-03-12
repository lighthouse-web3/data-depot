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
  githubClientId: process.env.GITHUB_OAUTH_CLIENT_ID ?? '',
  githubClientSecret: process.env.GITHUB_OAUTH_CLIENT_SECRET ?? '',
  origin: process.env.ORIGIN_URL ?? '',
  uploadPath: process.env.UPLOAD_PATH ?? '',
  carPath: process.env.CAR_PATH ?? '',
  secrets: {
    jwt: process.env.JWT_SECRET ?? '',
    jwtExp: '20d',
  },
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
  githubClientId: Joi.string().required().messages({
    'any.required': `'GITHUB_OAUTH_CLIENT_ID IS MISSING'`,
  }),
  githubClientSecret: Joi.string().required().messages({
    'any.required': `'GITHUB_OAUTH_CLIENT_SECRET IS MISSING'`,
  }),
  secrets: Joi.object({
    jwt: Joi.string().required().messages({
      'any.required': `'JWT_SECRET IS MISSING'`,
    }),
    jwtExp: Joi.string(),
  }),
}).unknown()

const { value: envVars, error } = envVarsSchema.validate(baseConfig)

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

export default baseConfig
