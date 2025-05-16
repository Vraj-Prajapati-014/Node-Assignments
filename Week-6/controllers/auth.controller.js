import User from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
    const{name,email,password,role}=req.body;
   try{
    const userExist=await User.findOne({email});
    if(userExist) return res.status(400).json({message:'User already exists'});
    const user=await User.create({
        name,
        email,
        password,
        role
    });
    const token=generateToken(user);
    res.status(201).json({user:{_id:user._id,email:user.email,role:user.role},token});
   }catch(err){
    return res.status(500).json({ message: 'Server error', error: err.message });
   }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) return res.status(400).json({ message: 'Invalid email or password' });
         const token = generateToken(user);
         res.status(200).json({ user: { _id: user._id, email: user.email, role: user.role }, token });
    }catch (err) { 
        return res.status(500).json({ message: 'Invalid credentials' });
    }
}