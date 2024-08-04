const { body, check }  = require("express-validator")

exports.validateUser = [
    check('first_name').not().isEmpty().withMessage(('Please enter your first name!')),
    check('last_name').not().isEmpty().withMessage('Please enter your last name!'),
    check('email_address').isEmail().withMessage('Please enter a valid email!'),
    check('password').isLength({ min: 8 }).withMessage('Password should be at least 8 characters!'),
    check('status').isIn(['active', 'inactive']).withMessage('Status should be either active or inactive'),
    check('permissions').isIn(['super_admin', 'app_user', 'moderation', 'business', 'directory', 'social_media_feed']).withMessage('Invalid permission value'),
    check('phone_number').not().isEmpty().withMessage('Please enter your phone number!'),
    check('business_name').not().isEmpty().withMessage('Please enter your business name!')
]