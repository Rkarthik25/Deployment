
const express=require("express")
const { connection } = require("mongoose")
const db=require("./db")
const app=express()
const {userRouter} =require("./Route/user.router")
const{postRouter}=require("./Route/post.router")
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("home page")
})


app.use("/users",userRouter)
app.use("/posts",postRouter)
app.listen(8080,async()=>{
    try {
        await connection
        console.log("connected to db")

    } catch (err) {
        console.log("not connected")
    }
    console.log("server on 8080")
})