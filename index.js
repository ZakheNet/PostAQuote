const express = require("express")
const app = express()
require("dotenv").config()
const path = require("path")

app.use(express.static("public"))
const PORT = process.env.PORT || 8000

app.listen(PORT,()=>console.log("Port:"+PORT+" is Live!"))

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname+"/public/home.html"))
})

app.post('/', function (req, res) {
  res.send('POST request to the homepage')
})
