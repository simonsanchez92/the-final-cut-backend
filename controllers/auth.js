
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');



// @Description - Register user
// @Route - POST  /api/v1/auth/register
// @access - Public

exports.register = async(req,res,next)=>{

    const {name, email, password} = req.body;

    try {

        //First check if user already exists
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({msg: 'User already exists'});
        }

        //if it doesn't then..

        user = new User({
            name,
            email,
            password
        });

       //Password encryption
       const salt = await bcrypt.genSalt(10);
       
       user.password = await bcrypt.hash(password, salt);
       
       await user.save();


       const payload = {
           user:{
               id: user.id
           }
       }
       
       jwt.sign(payload,
                `${process.env.JWTSECRET}`,
                {expiresIn: 360000},
                (err, token)=>{
                    if(err){
                        throw err
                    }
                    res.json({token})
                })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            data: 'Internal server error'
        })
    }
};


// @Description - Get user
// @Route - GET  /api/v1/auth/users
// @access - Private

exports.getUsers = async(req,res,next)=>{

    const users = await User.find();

    res.status(200).json({
        success: true,
        data: users
    });

}

// @Description - Get user
// @Route - GET  /api/v1/auth/users/:id
// @access - Public
exports.getUser = async(req,res,next)=>{
    
}