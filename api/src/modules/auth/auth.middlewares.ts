import { check } from 'express-validator';
import { validate } from 'deep-email-validator';
import { Request, Response, NextFunction } from 'express';
import { DeepEmailValError, AuthError } from 'shared/errors/errors';
import type { DeepEmailValidationErrorDetails } from 'shared/errors/errors.types';

export const signupValidator = [
    check('email')
        .trim()
        .notEmpty().withMessage('Email is required!').bail()
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
        .custom((value, { req }) => value === req.body.password)
        .withMessage('Passwords do not match')
];

export const deepEmailValidation = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const { email } = req.body;

        const result = await validate({
            email,
            validateTypo: true,
            validateDisposable: true,
            validateMx: true,
            validateSMTP: false,
        });

        if (!result.valid) {
            throw new DeepEmailValError<DeepEmailValidationErrorDetails>(
                'Email not valid/deliverable/existent',
                '400',
                'EMAIL_NOT_DELIVERABLE',
                {
                    email,
                    reason: result.reason || 'Email failed deliverability checks / Invalid email address',
                }
            );
        }
        next();
    } catch (err) {
        next(err);
    }
};

export const loginValidator = [
    check('email')
        .trim()
        .notEmpty().withMessage('Email is required!').bail()
        .isEmail().withMessage('Please provide a valid email address!').bail()
        .normalizeEmail(),
    check('password')
        .notEmpty().withMessage('Please provide a password!').bail()
];

export const checkAuthentication = async(req:Request, res:Response, next:NextFunction) => {
    try{
        if(req.isAuthenticated && req.isAuthenticated()) {
            return next();
        }
        throw new AuthError("Failed Authentication", '401', "AUTH_FAILED", {
            reason: "You are not authenticated, please login!",
        });
    } catch(err){
        next(err); //proceed to error handling middleware
    }
};