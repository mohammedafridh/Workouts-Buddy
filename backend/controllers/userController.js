import userModel from "../models/userModel.js"
import bcrypt from 'bcrypt'
import validator from 'validator'
import jwt from 'jsonwebtoken'

const createToken = (_id)=>{
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

export const registerUser = async(req,res)=>{
    const {email,password} = req.body

    const exists = await userModel.findOne({email})
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    try{
        if(!email || !password){
            throw Error('All fields must be filled')
        }
        if(exists){
            throw Error('Email Already Taken')
        }
        if(!validator.isEmail(email)){
            throw Error('Email is not valid')
        }
        if(!validator.isStrongPassword(password)){
            throw Error('Password is not strong enough')       
        }else{

        const user = await userModel.create({email,password:hash})
        const token = createToken(user._id)
        res.status(200).json({user, token})
        }
    }catch(error){
        res.status(500).json({error: error.message})
    }
}

export const loginUser = async(req,res)=>{
    const {email,password} = req.body

    try{
        const user = await userModel.login(email,password)
        const token = createToken(user._id)
        res.status(200).json({user,token})
    }catch(error){
        res.status(500).json({error: error.message})
    }
   
}
