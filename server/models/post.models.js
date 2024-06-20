import mongoose,{Schema} from "mongoose";

const postSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    content:{
        type:String,
        required:true,
    },
    images:[
        {
            type:String
        }
    ],
    likes:[{
        type:Schema.Types.ObjectId,
        ref:"Like",
        default:[]
    }],
    comments:[{
        type:Schema.Types.ObjectId,
        ref:"Comment",
        default:[]
    }],
    
},{timestamps:true});


export const Post=mongoose.model("Post",postSchema);