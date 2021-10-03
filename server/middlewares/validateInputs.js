import { check, validationResult } from 'express-validator';

export const checkLoginInputs = [
  check('email').isEmail().withMessage('Invalid email'),
  check('password')
    .isLength({ min: 3 })
    .withMessage('Password must be at least (3) characters'),
];

export const checkSignupInputs = [
  check('name').not().isEmpty().withMessage('Name is required'),
  check('email').isEmail().withMessage('Invalid email'),
  check('password')
    .isLength({ min: 3 })
    .withMessage('Password must be at least (3) characters'),
];

export const checkUserUpdateInputs = [
  check('password')
    .isLength({ min: 3 })
    .optional({ nullable: true, checkFalsy: true })
    .withMessage('Password must be at least (3) characters'),
];

export const checkProductReviewInputs = [
  check('rating').not().isEmpty().withMessage('Rating is required'),
  check('comment')
    .isLength({ max: 1000 })
    .optional({ nullable: true, checkFalsy: true })
    .withMessage('Comment max 100 characters'),
];

export const checkShippingInputs = [
  check('street').not().isEmpty().withMessage('Street is required'),
  //suburb is optional
  check('postcode')
    .isNumeric()
    .withMessage('Postcodes must be numeric')
    .isLength({ min: 4, max: 4 })
    .withMessage('Postcode must be 4 digits'),
  check('city')
    .not()
    .isEmpty()
    .withMessage('City is required')
    .toLowerCase()
    .isIn([
      'melbourne',
      'sydney',
      'adelaide',
      'perth',
      'darwin',
      'canberra',
      'alice springs',
    ])
    .withMessage(
      'City must be one of: ' +
        [
          'melbourne',
          'sydney',
          'adelaide',
          'perth',
          'darwin',
          'alice springs',
        ].join(', ')
    ),
  check('country').not().isEmpty().withMessage('Country is required'),
];

export const checkPaymentInputs = [
  //nameOnCard is optional
  check('cardNumber')
    .isNumeric()
    .withMessage('Card number must be numeric')
    .isLength({ min: 16, max: 16 })
    .withMessage('Card number must be 8 digits'),
  check('expiryMonth')
    .not()
    .isEmpty()
    .withMessage('Expiry month is required')
    .isNumeric()
    .withMessage('Expiry month must be numeric')
    .isLength({ min: 1, max: 2 })
    .withMessage('Expiry month must be 2 digits')
    .isIn([...Array(12).keys()].map((num) => num + 1))
    .withMessage('Must be a valid month'),
  check('expiryYear')
    .not()
    .isEmpty()
    .withMessage('Expiry year is required')
    .isNumeric()
    .withMessage('Expiry year must be numeric')
    .isLength({ min: 2, max: 2 })
    .withMessage('Expiry year must be 2 digits')
    .isIn(
      [...Array(7).keys()].map((num) => num + new Date().getFullYear() - 2000)
    )
    .withMessage('Must be a valid year (now to next 7 years)'),
];

export const validateInputs = (req, res, next) => {
  try {
    if (!validationResult(req).isEmpty()) {
      const msg = validationResult(req)
        .errors.map((error) => error.msg)
        .join(', ');
      res.status(422);
      throw new Error(msg);
    }
    next();
  } catch (error) {
    next(error);
  }
};
