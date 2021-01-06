

const {check, validationResult} = require('express-validator');


exports.validateUser = [
    check('email')
        .not().isEmpty().withMessage('Email is required').bail()
        .isEmail().withMessage('You must enter a valid email'),
    check('password')
        .not().isEmpty().withMessage('You must include a password').bail()
        .isLength({min:6}).withMessage('Password must at least contain 6 characters'),
    (req,res,next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({errors: errors.array()});
            
        }
        next();
    }
]