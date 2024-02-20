const path=require('path')
const express=require('express')
const app=express()
const port=3001
app.use(express.static(path.resolve(__dirname,'../client/build')))
app.get('/api',(req,res)=>{
res.json({message:'hi my name is Munesh Pratap'})
})
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'.../client/build','index.js'))
})

.listen(port,()=>{
    console.log(`i am listen on port ${port}`)
})