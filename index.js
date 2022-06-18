const express = require("express")
const res = require("express/lib/response")
const app = express()

const PORT = process.env.PORT || 8080

app.use('/', (req,res)=>{
    res.json({success: "Succesasdasds"})
})

app.listen(PORT, ()=>{
    console.log(`You are connected to port ${PORT}`)
})