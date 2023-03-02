const joi = require('joi')

module.exports.pieceCIDSchema = joi.object({
  pieceCID: joi.string().required().messages({
    'any.required': `pieceCID not found`,
  }),
})
