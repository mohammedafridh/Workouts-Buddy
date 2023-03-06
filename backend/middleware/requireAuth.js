import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'


const requireAuth = async(req,res,next)=>{

    const {authorization} = req.headers

    if(!authorization){
        return res.status(403).json('Authorisation is required')
    }

    const token = authorization.split(' ')[1]

    try{
        const {_id} = jwt.verify(token, process.env.SECRET)
        req.user = await userModel.findOne({_id}).select('_id')
        next()
    }catch(error){
        res.status(500).json({error:'Request is not authorised.'})
    }

}

export default requireAuth