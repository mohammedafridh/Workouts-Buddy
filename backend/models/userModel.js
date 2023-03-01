import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = mongoose.Schema({
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true,
    }
},

    {timestamps:true}
)


userSchema.statics.login = async function (email,password){

    const user = await this.findOne({email})


    //validation
    if(!email || !password){
        throw Error('All fields must be filled')
    }
    if(!user){
        throw Error('Email is not available')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error('Password is incorrect!')       
    }

    return user
}

const userModel = mongoose.model('users', userSchema)
export default userModel