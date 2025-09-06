import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import {createJWT} from "../utils/cookie.js";


const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ status: false, message: "Invalid email or password" });
  }

  const isMatch = await user.matchPassword(password);

  if (user && isMatch) {
    const token =  createJWT(res,user._id);
    user.password = undefined;
      return res.status(200).json({
      status: true,
      message: "User logged in successfully",
      user,
      token
    });
  } else {
    return res.status(401).json({ status: false, message: "Invalid email or password" });
  }
});

const registerUser = async (req, res) => {
  try {
    const { name, email, password, admin, role} = req.body;
  
    const userExists = await User.findOne({ email });
  
    if (userExists) {
      return res
        .status(400)
        .json({ status: false, message: "Email address already exists" });
    }
  
    const newUser = await User.create({
      name,
      email,
      password,
      admin,
      role
    });
    await newUser.save();
    
    return res.status(201).json({success:true,message:"User created successfully",newUser});
  } catch (error) {
    console.log(error);
    return res.status(500).json({success:false,message:"Internal server error",error:error.message});
  }
  

  };
  const getAllUsers = async (req,res)=>{
    try {
      const users= await User.find().select('-password');
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({message:"Error fertching users",error});
    }
  }
  const logoutUser = (req, res) => {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: "Logged out successfully" });
  };
export {logoutUser,registerUser,loginUser,getAllUsers}  