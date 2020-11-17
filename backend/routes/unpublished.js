const router=require("express").Router()
const blogModel=require('../models/unpublished-blogs-model')

router.route("/load").post((req,res)=>{
blogModel.find({author:req.body.username})
    .then((response)=>res.json(response[0]))
    .catch((err)=>res.status(400).json(`Error:${err}`)  )

})

router.route('/update').post((req,res)=>{
    blogModel.findOneAndUpdate({author:req.body.username},{
        author:req.body.username,
        title:req.body.title,
        content:req.body.content,
        },{upsert:true})
            .then((response)=>res.json(response))
            .catch((err)=>res.status(400).json(`Error:${err}`)  )

})

router.route('/delete').post((req,res)=>{
    blogModel.deleteOne({author:req.body.username})
        .then((response)=>res.json(response))
        .catch((err)=>res.status(400).json(`Error:${err}`)  )
})



module.exports = router;