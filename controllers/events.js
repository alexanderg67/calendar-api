//const userModel = require('../models/Event')
const eventModel= require('../models/Event')
const getAllEvents =async (req,res) => {
   //get user with maximum id to know last id
    let lastDocument={}
      lastDocument= await eventModel.findOne({ },  {_id:0, __v:0}).sort('-id')
     if (!lastDocument) {
     lastDocument={}
     lastDocument.id=1
     }
     const tasks= await eventModel.find({username: req.username},  {_id:0, __v:0})
    res.json({data:tasks,lastid: lastDocument.id })
     
} 


const createEvent =async (req,res) => {
    try {
        req.body.username=req.username
        const tasknew=await eventModel.create(req.body)
        res.status(201).json({msg:'created'})
    }catch(err){
     res.status(500).json({msg:'validation error'})
    }
}

const deleteEvent =async (req,res) => {
    
    const eventID= req.params.id;
    try {
    const task=await eventModel.findOneAndDelete({ id: eventID}) 
    if(!task) {
        return res.status(500).json({msg: 'no such event id'})
    }

    res.status(200).json({msg: `event id ${eventID} deleted`})
}catch(err) {
    res.status(500).json({msg: 'request failed'})
}
}
module.exports= { getAllEvents,
createEvent,
deleteEvent,

}