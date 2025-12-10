const { get } = require("mongoose");
const testFunc = require("./test.js")



const express = require('express')
const app = express()
const port = process.env.PORT || 2000;

app.get('/', (req, res) => {testFunc,res.send('Hello World!, my name is Zakhe')})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))


const users = {
"BadSanta":{"password":123123,"quotes":[{"Nothing last's Forever":["Hunter","Hero"]}]},
"Zakhe":{"password":61116,"quotes":[{"Hello my World!":["BadSanta"]}]}}

app.get('/home', (req, res) => {
  res.sendFile("home.html")
})