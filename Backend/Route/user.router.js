

const express=require("express")

const jwt =require("jsonwebtoken")

const bcrypt=require("bcrypt")

const {UserModel} =require("../Model/user.model")

const userRouter =express.Router()

userRouter.post("/register",async(req,res)=>{

    const { name, email, gender, password, age, city}=(req.body)
    // console.log(payload)

    try {
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                res.send(err.message)
            }
            else{
                const user =new UserModel({ name, email, gender, password:hash, age, city })
                await user.save()
                res.send("user registered")
            }
        })
      
    } catch (err) {
        res.send("user not registered")
    }
})


userRouter.post("/login",async(req,res)=>{

    const {email,password}=req.body

    try {
        const user =await UserModel.find({email})

        if(user.length>0){
            bcrypt.compare(password,user[0].password,function(err,result){
                if(result){
                    let token=jwt.sign({userID:user[0]._id},"eval")
                    res.send({"msg":"logged in","token":token})
                }
                else{
                    res.send({"msg":"something went wrong","err":err.message})
                
                }
            })
        }
       
      
    } catch (err) {
        res.send({"msg":"something went wrong","err":err.message})
                
    }
})

module.exports={userRouter}