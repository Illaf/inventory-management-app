import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();
const createJWT = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  // res.cookie('token', token, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === 'production',
  //   sameSite: 'strict',
  //   maxAge: 1 * 24 * 60 * 60 * 1000, // 7 days
  // });
  return token;
};

const verifyToken= async(req,res,next) =>{
  const token= req.headers['authorization'];
  if(!token){
res.status(403).json({message:'token is required'});
  }
  try {
    const decoded= jwt.verify(token, process.env.JWT_SECRET)
    req.user=decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

 export  {createJWT, verifyToken};
