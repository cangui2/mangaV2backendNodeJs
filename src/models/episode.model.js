const mongoose =require('mongoose')

const EpisodeSchema = mongoose.Schema({
    number:String,
    location:String,
    name:String,
    page:String,
    is_active:{ type:Boolean,default:false},
    is_download:{ type:Boolean,default:false},
    manga:{type: mongoose.Schema.Types.ObjectId,ref:'Manga'},
},{
    timestamps:true
})
module.exports =mongoose.model('Episode',EpisodeSchema)