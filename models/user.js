const mongoose =require('mongoose')

const UserSchema= new mongoose.Schema ({
username: {
    type: String,
    required: [true,'Provide Username'],
    unique: true
},
hash: {
    type: String,
    required: [true,'Provide hash']
},
})
let userModel=mongoose.model('User',UserSchema)
module.exports= userModel;