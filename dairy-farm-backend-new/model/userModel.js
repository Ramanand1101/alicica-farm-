const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    username:{
        type:String,
       
    },
    email:{
        type: String ,
        require:[true,"Please enter the Email"]
    },
    password:{
        type : String ,
        required  : [ true ," Please enter the password" ]
    },
    role:{
        type:String,
        require:true,
        default:"customer",
        enum:["customer","admin"]
    }
})

const UserModel=mongoose.model("user",userSchema)

module.exports={
    UserModel
}