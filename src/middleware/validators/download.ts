import joi from 'joi'

export const pieceCIDSchema = joi.object({
  piece_cid: joi.string().required().messages({
    'any.required': `piece_cid not found`,
  }),
})
