const mongoose=require("mongoose")
require("dotenv").config()
const connectedDB=mongoose.connect(process.env.mongo_URI)

module.exports={
    connectedDB
}