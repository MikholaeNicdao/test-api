const express = require("express")
const res = require("express/lib/response")
const app = express()

const PORT = process.env.PORT || 8080

app.get('/', (req,res)=>{
    res.send("Hello World!")
})

app.listen(PORT, ()=>{
    console.log(`You are connected to port ${PORT}`)
})