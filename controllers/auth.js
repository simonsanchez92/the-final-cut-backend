

const User = require('../models/User');

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

        await user.save();

        res.status(200).json({
            success: true,
            data: user
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            data: 'Internal server error'
        })
    }
   

};