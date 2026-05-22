const jwt = require("jsonwebtoken");
const { createSearchIndex } = require("../model/user.model");
const blackListModel =require("../model/BlackListedToken.model")

async function authUser(req,res,next)
{
    const token = req.cookies.token;
    if(!token)
    {
      return  res.status(401).json({
            message:"token not found"
        })
    }

    const isBlackListed= await blackListModel.findOne({token});
    if(isBlackListed)
    {
        return res.status(400).json({
            message:"token invalid"
        })
    }
    try{
        const decoded = jwt.verify(token,process.env.secret);
        req.user=decoded;
        next();
    }
    catch(err)
    {
        return res.status(401).json({
            message:"token invalid"
        })
    }

}
module.exports={authUser}