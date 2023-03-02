const joi = require('joi')

module.exports.pageNumberSchema = joi.object({
  pageNo: joi.string().required().messages({
    'any.required': `pageNo not found`,
  }),
})

module.exports.fileIdSchema = joi.object({
  fileId: joi.string().required().messages({
    'any.required': `fileId not found`,
  }),
})
