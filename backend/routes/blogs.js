const router=require("express").Router()
const blogsModel=require("../models/blogs.model")

router.route("/newblog").post((req,res)=>{
    const newBlog={
        author:req.body.author,
        title:req.body.title,
        content:req.body.content,
        date:generateDate(),
        views:0,
        likes:0
    }
const addBlog=new blogsModel(newBlog)
addBlog.save()
    .then(resp=>res.json("blod added successfully"))
    .catch(err=>   res.status(400).json(`Error:${err}`)  )
}
)

router.route('/').post((req,res)=>{
    if(req.body._id){
        blogsModel.findById(req.body._id)
        .then(blogs=>res.json(blogs))
        .catch(err=>   res.status(400).json(`Error:${err}`)  )
    }
 else if (req.body.username){
    blogsModel.find({author:req.body.username})
        .then(blogs=>res.json(blogs))
        .catch(err=>   res.status(400).json(`Error:${err}`)  )
 }
 else{
    blogsModel.find()
    .then(blogs=>res.json(blogs))
    .catch(err=>   res.status(400).json(`Error:${err}`)  )
 }
})

router.route('/update').post((req,res)=>{
    blogsModel.findByIdAndUpdate(req.body._id,{title:req.body.title,
        content:req.body.content,
        date:generateDate()})
        .then((response)=>res.json(response))
        .catch((err)=>res.status(400).json(`Error:${err}`)  )

})

router.route('/addview').post((req,res)=>{
    blogsModel.findByIdAndUpdate(req.body._id,{
        $inc:{views:1}
    })
        .then((response)=>res.json(response))
        .catch((err)=>res.status(400).json(`Error:${err}`)  )
})

router.route('/addlike').post((req,res)=>{
    blogsModel.findByIdAndUpdate(req.body._id,{
        $inc:{likes:1}
    })
        .then((response)=>res.json(response))
        .catch((err)=>res.status(400).json(`Error:${err}`)  )
})


module.exports = router;


/////////////////

function generateDate(){
    let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;
return(today)
}


