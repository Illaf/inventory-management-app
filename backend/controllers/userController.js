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

const getUserById = async(req,res) => {
  try {
    const {id} = req.body
    const user = await User.findById(id)
    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json({message:"Error fertching user",error});
  }
}
const selectAdmin = async(req,res) => {
const {adminId} = req.body
const admin = await User.findOne({ _id: adminId, role: 'admin' });
if (!admin) {
  return res.status(400).json({ message: 'Invalid admin selected' });
}

req.user.admin = adminId;
req.user.adminChangedAt = new Date();
await req.user.save();

res.json({ message: 'Admin assigned successfully' });

}
const updateProfile = async (req, res) => {
  try {
    const userId = req.userId; // from auth middleware

    const {
      name,
      phone,
      address,
      admin
    } = req.body;

    const updates = {};

    // -------- BASIC DETAILS --------
    if (name) updates.name = name;
    if (phone) updates.phone = phone;
    if (address) updates.address = address;

    // -------- ADMIN CHANGE LOGIC --------
    if (admin !== undefined) {
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Admin users cannot assign another admin
      if (user.role === 'admin') {
        return res.status(403).json({
          message: 'Admin users cannot change admin'
        });
      }

      // If admin is being changed
      if (admin && admin.toString() !== user.admin?.toString()) {

        // Validate new admin
        const adminExists = await User.findOne({
          _id: admin,
          role: 'admin'
        });

        if (!adminExists) {
          return res.status(400).json({
            message: 'Invalid admin selected'
          });
        }

        updates.admin = admin;
        updates.adminChangedAt = new Date();
      }
    }

    // -------- UPDATE USER --------
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');

    return res.json({
      message: 'Profile updated successfully',
      user: updatedUser
    });

  } catch (error) {
    console.error('Update Profile Error:', error);
    return res.status(500).json({
      message: 'Something went wrong'
    });
  }
};

  const logoutUser = (req, res) => {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: "Logged out successfully" });
  };
export {logoutUser,registerUser,loginUser,getAllUsers,getUserById,selectAdmin,updateProfile}  