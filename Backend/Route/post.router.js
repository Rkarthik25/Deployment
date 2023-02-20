const express=require("express")
const jwt=require("jsonwebtoken")
const {PostModel} =require("../Model/post.model")

const postRouter =express.Router()

postRouter.get("/",(req,res)=>{

    let query={}
    if( req.query.device){
        query.device=req.query.device
    }
    
   const Id=req.body.userId
    const token=req.headers.authorization
    if(token){
        jwt.verify(token,"fs",async(err,decoded)=>{
            // const Id=decoded.userId
            const posts=await PostModel.find({...query,userId:Id})
            res.send(posts)
        })
    }
    else{
        res.send("Please Login")
    }
})

postRouter.post("/create",async(req,res)=>{
    const payload=req.body
    // console.log(payload)
    const post =new PostModel(payload)
    await post.save()
    res.send({"msg":"posts created"})

})


postRouter.patch("/update/:id", async(req,res)=>{
    const payload = req.body
    const id = req.params.id
    const post = await PostModel.findOne({"_id":id})
    const userID_in_post=post.userID
    const userID_making_req=req.body.userID
    try{
       if(userID_making_req!==userID_in_post){
           res.send({"msg":"You are not authorized"})
       }else{
           await PostModel.findByIdAndUpdate({"_id":id},payload)
           res.send(" post Updated ")
       }
    
    }catch(err){
       console.log(err)
       res.send({"msg":"Something went wrong"})
    }
    
   })

   postRouter.delete("/delete/:id", async(req,res)=>{
    
    const id = req.params.id
    const post = await PostModel.findOne({"_id":id})
    const userID_in_post=post.userID
    const userID_making_req=req.body.userID
    try{
       if(userID_making_req!==userID_in_post){
           res.send({"msg":"You are not authorized"})
       }else{
           await PostModel.findByIdAndDelete({"_id":id})
           res.send(" post deleted ")
       }
    
    }catch(err){
       console.log(err)
       res.send({"msg":"Something went wrong"})
    }
    
   })


module.exports={postRouter}