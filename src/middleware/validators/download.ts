import joi from 'joi'

export const pieceCIDSchema = joi.object({
  pieceCID: joi.string().required().messages({
    'any.required': `pieceCID not found`,
  }),
})
