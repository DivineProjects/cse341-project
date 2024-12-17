const { body, validationResult, param } = require('express-validator');

const userValidationRules = () => {
  return [
    // first_name and last_name as non-empty strings
    body('first_name').isString().notEmpty().withMessage('First name is required'),
    body('last_name').isString().notEmpty().withMessage('Last name is required'),

    // email format
    body('email').isEmail().withMessage('Invalid email format'),

    // age to be an integer (greater than or equal to 0)
    body('age').isInt({ min: 0 }).withMessage('Age must be a valid number and greater than or equal to 0'),

    // gender as a non-empty string
    body('gender').isString().notEmpty().withMessage('Gender is required'),

    // phone_number as a valid string (could add regex for phone validation)
    body('phone_number').isString().notEmpty().withMessage('Phone number is required'),

    // profile_picture
    body('profile_picture').optional().isString().withMessage('Profile picture should be a valid string'),

    // registration_date as a valid date
    body('registration_date').isDate().withMessage('Registration date must be a valid date'),

    // status as a string (could be "active", "inactive", etc.)
    body('status').isString().notEmpty().withMessage('Status is required'),

    // address as an object with necessary sub-fields
    body('address').isObject().custom(value => {
      if (!value.street || !value.city || !value.state || !value.zipcode || !value.country) {
        throw new Error('Address must contain street, city, state, zipcode, and country');
      }
      return true;
    }),

    // Address sub-field validations
    body('address.street').isString().notEmpty().withMessage('Street is required'),
    body('address.city').isString().notEmpty().withMessage('City is required'),
    body('address.state').isString().notEmpty().withMessage('State is required'),
    body('address.zipcode').isString().notEmpty().withMessage('Zipcode is required'),
    body('address.country').isString().notEmpty().withMessage('Country is required'),
  ]
};


// Validate user id as a MongoDB ObjectID
const userIdValidationRules = () => {
  return [
    // Validate user id as a MongoDB ObjectID
    param('id').isMongoId().withMessage('Invalid user ID'),
  ];
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}


module.exports = {
  userValidationRules,
  userIdValidationRules,
  validate
}