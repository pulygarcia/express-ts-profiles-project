import express from 'express'
import {body} from 'express-validator'
import { handleInputErrors } from '../middleware/validation';
import { login, registerUser } from '../handlers';

const router = express.Router();

router.post('/register', 
    body('handle')
    .trim()
    .toLowerCase()
    .isLength({ min: 3, max: 15 }).withMessage('handle should have between 3 and 15 characters.')
    .matches(/^[a-z0-9_]+$/).withMessage('handle only can have lowercase letters, underscores and numbers'),

    body('email')
    .isEmail().withMessage('Invalid email')
    .notEmpty().withMessage('Email cannot be empty'),

    body('password')
    .notEmpty().withMessage('Password cannot be empty')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/[0-9]/).withMessage('Password must contain at least one number')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter'),

    handleInputErrors,

    registerUser
);


router.post('/login', 
    body('email')
    .isEmail().withMessage('Invalid email')
    .notEmpty().withMessage('Email cannot be empty'),

    body('password')
    .notEmpty().withMessage('Password cannot be empty'),

    handleInputErrors,

    login
);

export default router