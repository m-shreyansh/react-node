const mongoose=require("mongoose")
const Schema=require("mongoose").Schema

const unpublishedblogsSchema=new Schema({
    author:{required:true,type:String},
    title:{required:true,type:String},
    content:{required:true,type:String},
    views:0,
    likes:0

    

})

const unpublishedBlogs=mongoose.model('unpublishedblogs',unpublishedblogsSchema);
module.exports =unpublishedBlogs;