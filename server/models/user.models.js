import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        min:4,
        max:15,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    profilePicture:{
        type:String,
        default:"",
    },
    refreshToken:{

        type:String,
    }


},{timestamps:true});

userSchema.pre("save",async function(next)
{
    if(!this.isModified("password")) return next();

    this.password=await bcrypt.hash(this.password,10);
    next();
    
})

userSchema.methods.comparePassword=async function(password){

     return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateAccessToken=function(){
   
    return jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username,

    },process.env.ACCESS_TOKEN_SECRET,{expiresIn:parseInt(process.env.ACCESS_TOKEN_EXPIRY)})
}

userSchema.methods.generateRefreshToken=function(){
   
    
    return jwt.sign({_id:this._id},process.env.REFRESH_TOKEN_SECRET,{expiresIn:parseInt(process.env.REFRESH_TOKEN_EXPIRY)})
}


export const User=mongoose.model("User",userSchema);