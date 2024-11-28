const { body, param, validationResult } = require('express-validator');

const stockValidationRules = () => {
    return [
      body('symbol').isString().notEmpty().withMessage('Symbol is required'),
      body('company_name').isString().notEmpty().withMessage('Company name is required'),
      body('current_price').isFloat({ gt: 0 }).withMessage('Current price must be a positive number'),
      body('volume').isInt({ gt: 0 }).withMessage('Volume must be a positive integer'),
      body('market_cap').isFloat({ gt: 0 }).withMessage('Market cap must be a positive number'),
      body('pe_ratio').optional().isFloat().withMessage('PE Ratio must be a valid number'),
      body('dividend_yield').optional().isFloat().withMessage('Dividend Yield must be a valid number'),
      body('52_week_high').isFloat({ gt: 0 }).withMessage('52 Week High must be a positive number'),
      body('52_week_low').isFloat({ gt: 0 }).withMessage('52 Week Low must be a positive number'),
      body('sector').isString().notEmpty().withMessage('Sector is required'),
      body('industry').isString().notEmpty().withMessage('Industry is required'),
      body('currency').isString().notEmpty().withMessage('Currency is required'),
  
      // last_updated should be a valid date string (ISO 8601 format)
      body('last_updated').isDate().withMessage('Last updated must be a valid date'),
    ];
  }

const getSingleValidationRules = () =>{
    return [
        param("symbol").notEmpty().withMessage('Stock symbol cannot be empty')
        .matches(/^[A-Z]{1,8}$/).withMessage("Stock symbol must be 1-8 characters long and contain only uppercase letters")
    ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}


module.exports = {
    stockValidationRules,
    getSingleValidationRules,
    validate
}