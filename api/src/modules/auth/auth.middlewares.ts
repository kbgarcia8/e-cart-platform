import { check } from 'express-validator';
import { ExpressValError } from 'shared/errors/errors';

export const signupValidator = [
    check('email')
        .isEmail().withMessage('Please provide a valid email address!').bail()
        .normalizeEmail(),
    check('firstname')
        .trim()
        .notEmpty().withMessage('First Name is required!').bail()
        .isAlpha().withMessage('First Name must contain alphabetic characters only!'),
    check('lastname')
        .trim()
        .notEmpty().withMessage('Last Name is required!').bail()
        .matches(/^[a-zA-Z0-9.\-]+$/).withMessage('Last Name can only contain letters, numbers, hypen and dots'),
    check('username')
        .trim()
        .optional({ checkFalsy: true })
        .isLength({min: 5, max: 35}).withMessage('Username must be atleast 5 characters and at max 35 characters!')
        .isAlphanumeric().withMessage('Username must contain alphanumeric characters only!'),
    check('password')
        .notEmpty().withMessage('Please provide a password!').bail()
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minSymbols: 1,
            minNumbers: 1,
        }).withMessage('Password must be at least 8 characters and include uppercase, lowercase, and a symbol'),
    check('confirmpassword')
        .notEmpty().withMessage('Please confirm password!').bail()
        .custom((value, { req }) => {
            if (value !== req.body['confirmpassword']) {
                throw new ExpressValError("Password do not match", 400, "EXPRESS_VAL_ERROR_PASSWORD_NOT_MATCH", {
                    detail: "Password during signup does not match!",
                });
            }
            return true;
        })
];