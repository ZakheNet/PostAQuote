const express = require("express")
const app = express()

const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.send('HELLO ZAKHE!!')
})

app.listen(PORT,()=>console.log("Port:"+PORT+" is Live"))