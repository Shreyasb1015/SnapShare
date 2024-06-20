import mongoose,{Schema} from "mongoose";

const storySchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    content:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
},{timestamps:true});


export const Story=mongoose.model("Story",storySchema);