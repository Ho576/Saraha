import userModel from './../../../db/models/User.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { signinSchema, signupSchema } from './auth.validation.js';
import SendEmail from '../../utils/sendEmail.js';

export const signup = async(req,res)=>{

    const {userName,email,password} = req.body;
    
    const user = await userModel.findOne({email});
    if (user){
        return res.status(409).json({message:"email already in use"});
    }
    const hashedPassword = await bcrypt.hash(password,parseInt(process.env.SALT_ROUND));

    const newUser = await userModel.create({userName,email,password:hashedPassword});
    if (!newUser){
        return res.json({message:"error creating user"});
    }
    const token = await jwt.sign({email},process.env.CONFIRMEMAILTOKEN,{expiresIn:'1h'});
    const refreshToken = await jwt.sign({email},process.env.CONFIRMEMAILTOKEN,
        {expiresIn:60*60*24*30});

    const html = `
    <h1>Saraha</h1>
    <h2>Welcome ${userName}</h2>
    <div>
    <a href='${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}'>Confiem Email</a>
    <a href='${req.protocol}://${req.headers.host}/auth/confirmEmail/${refreshToken}'>Resend Confiem Email</a>

    </div>
   
    `;
    await SendEmail(email,'welcom message',html);

    return res.status(201).json({message:"success creating user",newUser});
};
export const signin = async(req,res)=>{

    const {email,password} = req.body;


    const user = await userModel.findOne({email}).select('userName password confirmEmail');
    if (!user){
        return res.json({message:"email not in use"});
    }

    if(!user.confirmEmail)
    {
        return res.json({message:"plz confirm your email"});
    }

    const match = await bcrypt.compare(password,user.password);

    if(!match) {
        return res.json({message:"invaled password"});
    }

    const token = jwt.sign({id:user._id},process.env.LOGINSIG,{expiresIn:'1h'})

    return res.json({message:"success",token});
};
export const confirmEmail = async(req, res) => {
    const {token} = req.params;
    const decoded = jwt.verify(token,process.env.CONFIRMEMAILTOKEN);
    const user = await  userModel.updateOne({email:decoded.email},{confirmEmail: true},{new:true});
if(user.modifiedCount > 0) {
    return res.redirect(process.env.FEURL);
}
};