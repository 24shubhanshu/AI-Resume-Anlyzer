

const userModel= require("../model/user.model.js");
const blackListModel= require("../model/BlackListedToken.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * 
 * @name registerUserController
 * @description register new user,usename,email,password is required 
 * @access public
 */

async function registerUserController(req,res)
{
    const{userName,email,password} = req.body;

    if(!userName||!email||!password)
    {
        return res.status(400).json({
            message:"All fields are required"
        })
    }
    const isUserExist= await userModel.findOne({
        $or:[{userName},{email}]
    })

    if(isUserExist)
    {
        return res.status(400).json({
            message:"Account already exists with this username and email"
        })
    }
    const hash= await bcrypt.hash(password,10);

    const user= await userModel.create({
        userName,
        email,
        password:hash
    })

    const token = jwt.sign(
        {id:user.id , userName:user.userName},
       process.env.secret,
        {expiresIn:"1d"}
    )
    res.cookie("token",token);
    res.status(201).json({
        message:"Account created Successfully",
        user:{
            id:user.id,
            userName:user.userName,
            email:user.email
        }
    })
}

/**
 * 
 * @name loginUserController
 * @description login user,usename,password is expects in the body 
 * @access public
 */

async function loginUserController(req,res)
{
  const{email,password}= req.body;

  const user= await userModel.findOne({email});

  if(!user)
  {
    return res.status(400).json({
        message:"Invalid email OR password"
    })
  }

  const isPasswordValid= await bcrypt.compare(password,user.password);

  if(!isPasswordValid)
  {
    return res.status(400).json({
        message:"invalid email or password"
    })
  }

  const token = jwt.sign(
    {id:user.id,userName:user.userName},
    process.env.secret,
    {expiresIn:"1d"}
  )
    res.cookie("token",token);

    res.status(200).json({
    message:"login succesfully",
    user:{id:user.id,
        userName:user.userName,
        email:user.email
    }
   })
}

/**
 * 
 * @name logoutUserController
 * @description clear token from cookie and add it in the blacklist
 * @access public
 */

async function logoutUserController(req,res){
const token = req.cookies.token;

if(token)
{
    await blackListModel.create({token});
}
res.clearCookie("token");
res.status(200).json({
    message: "user logged out successfully"
})

}

/**
 * 
 * @name getmeUserController
 * @description show login user details
 * @access public
 */
async function getmeUserController(req,res) {
    const user= await userModel.findById(req.user.id);
    res.status(200).json({
        user:{
            id:user.id,
            userName:user.userName,
            email:user.email
        }
    })

}

module.exports={registerUserController
    ,loginUserController,logoutUserController,getmeUserController
};