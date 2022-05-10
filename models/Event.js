const mongoose =require('mongoose')

const UserSchema= new mongoose.Schema ({
title: {
    type: String,
    required: [true,'Provide Username']
},
color: String,
id: {
    type: Number,
    required: [true,'Provide number']
},
from: {
    type: Date,
    required: [true,'Provide From_date']
},
to: {
    type: Date,
    required: [true,'Provide To_date']
},
username: {
    type: String,
    required: [true,'Provide username of event']
},

    
 


 

})


let userModel=mongoose.model('Event',UserSchema)
module.exports= userModel;