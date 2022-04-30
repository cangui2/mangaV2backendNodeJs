const mongoose =require('mongoose')

const SourceSchema =mongoose.Schema({
    name:String,
    url:String,
    manga:{type: mongoose.Schema.Types.ObjectId,ref:'Manga'},
},{
    timestamps:true
})
module.exports =mongoose.model('Source',SourceSchema)