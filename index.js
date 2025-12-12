require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const PORT = process.env.PORT || 8000
const DBString = process.env.DBString


async function StartServer(){
    await mongoose.connect(DBString)
    mongoose.connection.once("open",()=>{
        console.log("Database Active!")
    })
}

app.listen(PORT,()=>{console.log("Port:"+PORT+" is Live!")})
StartServer()


app.get("/",(req,res)=>{
    res.send("LIVE!!!")
})