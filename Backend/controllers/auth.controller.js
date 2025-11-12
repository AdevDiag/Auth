import userModel from "../models/userModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
export const signup=async(request,response)=>{
    try{
        const {username,email,password}=request.body;
        const findUser=await userModel.findOne({$or:[{username},{email}]});
        if(!username || !email || !password) throw new Error("Please Enter valid credentials!")
        if(findUser) throw new Error("User already exists!");
        let hashedPwd=await bcrypt.hash(password,10);
        const newUser=new userModel({username,email,password:hashedPwd});
        await newUser.save();
        return response.status(201).send({success:true,error:false,message:"User created Succesfully!"})
    }catch(error){
        const errorsMap={
            "Please Enter valid credentials!":401,
            "User already exists!":409
        }
        let status=errorsMap[error.message] || 500;
        return response.status(status).send({error:true,message: error?.message})
    }
}
export const signin=async(request,response)=>{
    try{
        const {email,password}=request.body;
        const findUser=await userModel.findOne({email});
        if(!findUser) throw new Error("User not found!");
        let isPasswordCorrect=await bcrypt.compare(password,findUser.password);
        if(!isPasswordCorrect) throw new Error("Invalid email or password");
        let {password:_,...rest}=findUser.toObject()
        const token=jwt.sign({id:findUser._id},process.env.JWT_SECRET,{expiresIn:1000*60*60})
        return response.status(200).cookie('access_token',token,
            {httpOnly:true,sameSite:'strict',secure:true,maxAge:1000*60*60})
            .send({success:true,error:false,message:"User logged In succesfully",user:rest});
    }catch(error){
        const errorsMap={
            "User not found!":404,
            "Invalid email or password":401
        }
        let status=errorsMap[error.message];
        return response.status(status).send({
            error:true,
            message:error?.message
        })
    }
}

export const google=async(request,response)=>{
    try{
        const {username,email,photoURL}=request.body
        const findUser=await userModel.findOne({email:email});
        
        if(findUser){
            const token=jwt.sign({id:findUser._id},process.env.JWT_SECRET,{expiresIn:1000*60*60});
            let {password:_,...rest}=findUser.toObject()
            return response.status(200).cookie('access_token',token,
            {httpOnly:true,sameSite:'strict',secure:true,maxAge:1000*60*60})
            .send({success:true,error:false,message:"User logged In succesfully",user:rest});
        }else{
            let generatedPwd=Math.random().toString(36).slice(-8);
            let hashedPwd=await bcrypt.hash(generatedPwd,10);
            let newUser={username:username.split(" ").join("").toLowerCase()+ Math.floor(Math.random()*10000).toString(),
                email,
                password:hashedPwd}
            newUser=photoURL?{...newUser,profilePic:photoURL}:{...newUser}
            const addNewUser=new userModel(newUser);
            await addNewUser.save();
            const token=jwt.sign({id:addNewUser._id},process.env.JWT_SECRET,{expiresIn:1000*60*60});
            const {password:_,...rest}=addNewUser.toObject();
            return response.status(200).cookie('access_token',token,
            {httpOnly:true,sameSite:'strict',secure:true,maxAge:1000*60*60})
            .send({success:true,error:false,message:"User logged In succesfully",user:rest});
        }
    }catch(error){

    }
}