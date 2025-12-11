require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({name:String,password:Number})
const User = mongoose.model("User",UserSchema,"users")

async function ConnectDB(){
    try{
        await mongoose.connect(process.env.DBString)
    }
    catch(error){
        console.log(error)
    }
}
const PORT = process.env.PORT || 5000
ConnectDB()
mongoose.connection.once("open",()=>{
                console.log("DB Connected!")
                app.listen(PORT,()=>console.log("Port:"+PORT+" is Live"))
            })

app.get('/', (req, res) => {

    console.log(User.findOne({name:"Hero"}));
    
  res.send('HELLO KING!!')
})

