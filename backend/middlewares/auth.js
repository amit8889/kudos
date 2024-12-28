const asyncHandler = require('./asyncHandler');
const User = require("../models/User.js")
const mongoose = require('mongoose')
exports.verifyUser = asyncHandler(async(req,res,next)=>{
    console.log(req.headers)
    const {userid:userId} = req.headers
    console.log(userId)
    if (!userId) {
        return res.status(400).json({ success:false,message: 'Please provide userId' });
      }
    
        // Case-Insensitive Email Search (Improved)
        const user = await User.findOne({ _id:new mongoose.Types.ObjectId(userId) }).select('name _id'); // Project specific fields
    
        if (!user) {
          return res.status(401).json({ success:false,message: 'Invalid userId' }); // More informative error
        }
        req.user = user;
        next();
    
})