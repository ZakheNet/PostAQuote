require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const app = express()
const PORT = process.env.PORT || 9000
const path = require("path")

app.use(express.static("./public"))
app.use(express.json())

const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.DBString)
        app.listen(PORT, () => { console.log("PORT:" + PORT + " Live!") })
    }
    catch(error){console.log("Error Connecting Database: "+error)}
}
ConnectDB()
mongoose.connection.once("open", () => console.log("DB Connected!"))
mongoose.connection.on("error", () => console.log("DB Error!"))

const PlayerSchema=new mongoose.Schema({name:String,password:String})
const PlayerDB = mongoose.model("Player",PlayerSchema,"players")



app.get("/", async (req, res) => {
    res.sendFile(path.join(__dirname + "/public/home.html")) 
})

app.get("/MakeQuiz", async (req, res) => {
    res.sendFile(path.join(__dirname + "/public/makequiz.html")) 
})




