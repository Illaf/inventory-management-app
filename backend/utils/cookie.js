import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();
const createJWT = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
return token;
};

const verifyToken= async(req,res,next) =>{
  const authHeader= req.header('Authorization');
  if(!authHeader){
res.status(403).json({message:'token is required'});
  }
  try {
    const token= authHeader.startsWith('Bearer ')? authHeader.split(' ')[1]:authHeader;
    const decoded= jwt.verify(token, process.env.JWT_SECRET)
    req.user=decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

 export  {createJWT, verifyToken};
