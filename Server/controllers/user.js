import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

export const signIn = async(req, res)=>{
    const {email, password} = req.body;
    try{
        const exsistingUser = await User.findOne({email});
        if(!exsistingUser) return res.status(404).json("user dosen't exsist");
        const isPasswordCorrect = await bcrypt.compare(password, exsistingUser.password);
        if(!isPasswordCorrect) return res.status(400).json({message: 'Invalid credentials'});
        const token = jwt.sign({email: exsistingUser.email, id: exsistingUser._id}, 'test',{expiresIn:'1h'});
        res.status(200).json({result: exsistingUser, token});

    }catch(e){
        console.log(e)
        res.status(500).json({message: 'something went wrong'});
    }
}
export const signUp = async(req, res)=>{
    const {email,password,firstName,lastName,confirmPassword} = req.body;
    try{
       
        const exsistingUser = await User.findOne({email});
       
        if(exsistingUser){ 
            
            return res.status(400).json({message: "User already exsists"});
            
        }
        if(password !== confirmPassword) {
        
            return res.status(400).json({message: "Password doesn't match"});
        }
        const hashedPassword = await bcrypt.hash(password, 12);
       
        const result = await User.create({email, password: hashedPassword, name: `${firstName} ${lastName}`})
      
        const token = jwt.sign({email: result.email, id: result._id}, 'test',{expiresIn:'1h'});
       
        res.status(200).json({result, token});
    }catch(e){
        console.log(e)
        res.status(500).json({message: 'something went wrong'});
    }
}