import userModel from "../models/userModel.js";
import bcrypt from "bcrypt"
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