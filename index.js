require("dotenv").config()
const { log } = require("console")
const print = console.log()
const express = require("express")
const mongoose = require("mongoose")
const app = express()
const PORT = process.env.PORT || 9000
const path = require("path")
app.set("trust proxy", true);
app.use(express.static("./public"))
app.use(express.json())

app.use(express.static(path.join(__dirname, "public")))

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

const PlayerSchema=new mongoose.Schema({name:String,gameId:String,created:String,Picks:Object,officialTopics:Array,players:[{name:String,myIp:String,score:Number}]})
const PlayerDB = mongoose.model("Player",PlayerSchema,"players")

app.get("/", async (req, res) => {
    res.sendFile(path.join(__dirname + "/public/home.html")) 
})

app.get("/MakeQuiz", async (req, res) => {
    res.sendFile(path.join(__dirname + "/public/makequiz.html")) 
})

app.get('/quiz/:gameId', (req, res) => {
    res.sendFile(path.join(__dirname + "/public/playQuiz.html"))
})



app.get("/share", async (req, res) => {
    res.sendFile(path.join(__dirname + "/public/share.html")) 
})

app.post("/sharing", async (req, res) => {
    const {name,officialTopics,Picks}=req.body
    const DTime= new Date
    const gameId = Math.ceil(Math.random()*9999)+name.toLowerCase()
    const link0 = "localhost:9000/"+"quiz/"+gameId
    const link = "https://friendorstranger.vercel.app/"+"quiz/"+gameId
    const page = "/share"
    const state = "good"
    const dob = DTime.getDate()+"/"+(DTime.getMonth()+1)+"/"+DTime.getFullYear()

    PlayerDB.insertOne({"name":name,"gameId":gameId,"created":dob,Picks,officialTopics,"players":[{name,myIp:req.ip,score:99}]})
    

    res.json({name,link:link,page,state})
  
    //res.sendFile(path.join(__dirname + "/public/share.html")) 
})

app.post("/quizData",async (req,res)=>{
    
    const gameId = req.body["gameId"]
    const gameData = await PlayerDB.findOne({gameId:gameId})    
    if(gameData==null || gameData==undefined){
        res.json({"state":"nogame"})
        return
    }

    let exist = false
    gameData["players"].map(player=>{
        if(player.myIp==req.ip){
            exist=true
        }
    })

    if(exist){
        console.log("THis player has played!");
    }

    
    res.json({"state":"good","data":gameData})
})

app.post("/played",async (req,res)=>{
    const data=req.body
    console.log(data);
    AddPlayer(data)
    let state = "bad"
    async function AddPlayer(data){
        await PlayerDB.updateOne({gameId:data["gameId"]},{$push:{players:{name:data["name"],myIp:req.ip,score:data["score"]}}})
        state="good"
        res.json({state})
    }
})

app.get('/scores/:gameId', (req, res) => {
    res.sendFile(path.join(__dirname + "/public/score.html")) 
})

app.get('/scoresData/:gameId', (req, res) => {
    const gameId = req.params.gameId
    async function getScores(gameId){
        const data = await PlayerDB.find({gameId},"players")
        res.json(data)     
    }
    getScores(gameId)
  
})

app.get('/gameOwner/:gameId', (req, res) => {
    const gameId = req.params.gameId
    async function getScores(gameId){
        const data = await PlayerDB.find({gameId},"name")
        res.json(data)     
    }
    getScores(gameId)
  
})

