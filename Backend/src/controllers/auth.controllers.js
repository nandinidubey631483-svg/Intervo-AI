const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require("../models/blacklist.model")


/**
 * @name registerUserController
 * @description register a new user, expects username, email and password in the request body parameter
 * @access PUBLIC
 */

async function registerUserController(req,res){
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        return res.status(400).json({
            message: "Please provide username, email and password"
        })
    }
    const isUserAlreadyExists = await userModel.findOne({
    $or: [{username},{email}]
})

if(isUserAlreadyExists){
    return res.status(400).json({
        message:"Account already exixts with this email address or username"
    })
}
   const hash = await bcrypt.hash(password, 10)
   const user = await userModel.create({
    username,
    email,
    password:hash
   })
   const token = jwt.sign(
    {id:user._id, username: user.username},
    process.env.JWT_SECRET,
    {expiresIn: "2d"}
   )
  res.cookie("token", token, {
  httpOnly: true,
  sameSite: "lax",
  secure: false
});

   res.status(201).json({
    message:"User registered successfully",
    token
   })
}
/**
 * @name loginUserController
 * @description login a user expects  email and password in the request body parameter
 * @access Public
 */
async function loginUserController(req,resp){
    const {email,password} = req.body
    const user = await userModel.findOne({email})
    if(!user){
        return resp.status(400).json({
            message:"Invalid email or password"
        })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if(!isPasswordValid){
         return resp.status(400).json({
            message:"Invalid email or password"
        })
    }
    const token = jwt.sign(
    {id:user._id, username: user.username},
    process.env.JWT_SECRET,
    {expiresIn: "2d"}
    )
    resp.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",   // 🔥 VERY IMPORTANT
    secure: false      // dev के लिए
})
    return resp.status(200).json({
        message:"user logged in successfully",
        user:{
            id: user._id,
            username: user.username,
            email:user.email,
        }
    })
}

/**
 * @name logoutUserController 
 * @route GET /api/auth/logout
 * @description clear token from user cookie and add the token in blacklist
 * @access Public
 */
async function logoutUserController(req,resp){
    const token = req.cookies.token
    if(token){
        await tokenBlacklistModel.create({token})
    }
    resp.clearCookie("token")
    resp.status(200).json({
        message:"User logged out successfully"
    })

}

/**
 * @name getUserController
 * @description fetches user information
 * @access private
 */
async function getUserController(req,resp){
    const user = await userModel.findById(req.user.id)
    return resp.status(200).json({
        user:{
            id: user.id,
            username: user.username,
            email: user.email
        }
    })
}


module.exports = {registerUserController,loginUserController,logoutUserController,getUserController};