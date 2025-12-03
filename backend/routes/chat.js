import express from "express";
import Thread from "../models/Thread.js";
import getapiresponse from "../utils/groqapi.js";


const router=express.Router();

router.post("/test", async (req,res)=>{
    try{
        const newthread=new Thread({
            threadID:"134",
            title:"Test Thread",
            messages:[
                {role:"user", content:"Hello, this is a test message."}
            ]
        });
        const response=await newthread.save();
        res.json(response);
    }
    catch(err){
        console.log("Error creating thread:",err);
        res.status(500).json({error:"Internal server error"});
    }
});

router.get("/thread", async (req,res)=>{
    try{
        const threads=await Thread.find({}).sort({updatedAt:-1});
        res.json(threads);
    }
    catch(err){
        console.log(err);
        res.send(500).json({error:"Internal Server Error"});
    }
});

router.get("/thread/:threadID",async(req,res)=>{
    const {threadID}=req.params;
    try{
        const th=await Thread.findOne({threadID});
        if(!th){
            res.status(404).json({error:"Thread not found"});
        }
        else{
            res.json(th.messages);
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"});
    }
});

router.delete("/thread/:threadID", async(req,res)=>{
    const {threadID}=req.params;
    try{
        const deletedthread=await Thread.findOneAndDelete({threadID});
        if(!deletedthread){
            res.status(404).json({error:"Thread not found"});
        }
        else{
            res.json({message:"Thread deleted successfully"});
        }
        
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"});
    }
});

router.post("/chat", async(req,res)=>{
    let {threadID, message}=req.body;//access id and message
    if(!threadID ||!message){
        return res.status(400).json({error:"Missing required fields"});
    }// need to have both id and message
    try{
        let thread=await Thread.findOne({threadID});//finding the thread
        if(!thread){
            thread=new Thread({
                threadID,
                title:message.substring(0,20),
                messages:[{role:"user", content:message}]
            })
            }//create new thread from same id if doesn't exist
        else{
            thread.messages.push({role:"user", content:message})
            }//if exists, push message to content
        await thread.save();
        let response=await getapiresponse(message);
        thread.messages.push({role:"assistant", content:response});
        thread.updatedAt=Date.now();
        await thread.save();
        res.json({reply:response});
        }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"});
    }
});

export default router;