import joi from 'joi'

export const pageNumberSchema = joi.object({
  pageNo: joi.string().required().messages({
    'any.required': `pageNo not found`,
  }),
})

export const fileIdSchema = joi.object({
  fileId: joi.string().required().messages({
    'any.required': `fileId not found`,
  }),
})
