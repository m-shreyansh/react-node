const router=require("express").Router()
const userModel=require('../models/user.model')

router.route("/*").post((req,res)=>{
    const username=req.body.requiredUser
   
    async function doWork(){
        try{
        const userInfo= await userModel.findOne({username:username})
        res.json({
            username:userInfo.username,
            email:userInfo.email
        })
    }
    catch(err){
        console.log("Error: "+ err)

    }
    }

    doWork()

})




module.exports = router;