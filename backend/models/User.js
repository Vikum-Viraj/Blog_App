import mongoose from "mongoose"
const Schema = mongoose.Schema;


const userShema = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
  
    },

    blogs:[{type:mongoose.Types.ObjectId,ref:"Blog",required:true}] //make reference with user collection one user can make more blogs

})


export default mongoose.model("User",userShema);