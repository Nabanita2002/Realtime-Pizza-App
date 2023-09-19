// / creating a schema
const mongoose=require('mongoose')
const menuSchema = new mongoose.Schema({
   
    image:{type:String,required:true},
    name: {type:String, required:true},
    price:{type:Number,required:true},
    size:{type:String,required:true},
})

module.exports=mongoose.model('Menu', menuSchema) 