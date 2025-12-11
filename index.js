const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000
const path = require("path")

app.use(express.static("public"))

mongoose.connect("mongodb://localhost:27017/App")
mongoose.connection.once("open",()=>console.log("DB Connected!!!"))
mongoose.connection.on("error",(error)=>console.log("ERROR::"+error))


const userSchema = new mongoose.Schema({"name":{type:String,required:true}})
const User = mongoose.model("User",userSchema,"users")


app.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname+"/public/home.html"))
    async function getdata(){
        await User.insertOne({name:"Wednesday"})
        await User.deleteOne({name:"Wednesday"})
        const data = await User.find()
        console.log(data);
        
    }
    getdata()
    
})

app.listen(port,()=>console.log("Host is Live!!!"))


