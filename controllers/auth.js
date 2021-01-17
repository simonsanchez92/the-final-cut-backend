
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


    try {

        const user = await User.findById(req.user.id);

        if(!user){
           return res.status(400).json({
                success: false,
                data: `No user found with the id of ${req.user.id}`
            })
        }
        
        res.status(200).json({
            success: true,
            data: user
        });
        
    } catch (err) {
            res.status(400).json({
                success: false,
                data: `${err.value} is not a valid ObjectId`
            })
    }  
}

// @Description - login and get token
// @Route - POST  /api/v1/auth/login
// @access - Public

exports.login = async (req,res,next)=>{

    
    
    const {email, password} = req.body;
    
    try {
        let user = await User.findOne({email});
       
        if(!user){
            return res.status(400).json({msg: 'Invalid credentials'});
        }
       
        const isMatch = await bcrypt.compare(password, user.password);

       

        if(!isMatch){
            return res.status(400).json({msg: 'Invalid credentials'})
        }
     

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload,
            process.env.JWTSECRET,
            {expiresIn: 360000},
            (err,token)=>{
                if(err) throw err;
                return res.json({token});
            }
        )
        

    } catch (err) {
        res.status(500).send('Server error!');
    }
}


// @Description - Delete user
// @Route - Delete  /api/v1/auth/users/:id
// @access - Public

exports.deleteUser = async(req,res,next)=>{


    try {

        await User.findByIdAndDelete(req.params.id);

      
        res.status(200).json({
            success: true,
            data: 'User deleted'
        });

    } catch (err) {

        res.status(400).json({
            success: false,
            data: `No user found with the id of ${req.params.id}`
        });
    }    
   
}