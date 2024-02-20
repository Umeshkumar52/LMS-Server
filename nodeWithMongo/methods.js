const mongodb=require('mongodb')
const express=require('express')
const app=express()
app.get('/get',(req,res)=>{
res.send('succesfull')
})
app.put('/put',(req,res)=>{
    res.send(' put succesfull')
    })
app.listen(3001) 