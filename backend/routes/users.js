const router = require('express').Router()
const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const { response } = require('express')
const jsonwebtoken = require('jsonwebtoken');

require('dotenv').config();
const JWT_KEY=process.env.JWT_KEY


let validToken=[];


router.route('/').get((req, res) => {

    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json(`Error:${err}`))
})

router.route('/add').post((req, res) => {
    const username = req.body.username
    const email = req.body.email
    const unhashedPassword = req.body.password

    // bcrypt.hash(password,10)
    //     .then(response=>{
    //         const newUser=new User({username,email,response})
    //         console.log(response)
    //         console.log(newUser)
    //          newUser.save()
    //             .then(()=>res.json('New user added!'))
    //             .catch(err=>res.status(400).json(`Error:${err}`))          
    //     })
    // .catch(err=>res.status(400).json(`Error:${err}`))
    async function dowork() {
        try {
            const password = await bcrypt.hash(unhashedPassword, 10)
            const newUser = new User({ username, email, password })
            await newUser.save()
            res.json('New user added!')

        }
        catch (err) {
            res.status(400).json(`Error:${err}`)
        }
    }
    dowork();

})

router.route('/login').post((req, res) => {
    User.findOne({ username: req.body.username })
        .then((user) => {
            if (!user) {
                res.json("Invalid Username")
            }
            else {
                if (!req.body.password) {
                    res.json("Password is required")
                }
                else {
                    bcrypt.compare(req.body.password, user.password)
                        .then((result) => {
                            if (result == true) {
                                const token=jsonwebtoken.sign({ username: user.username }, JWT_KEY)
                                // localStorage.set({authHeader:token})
                                validToken.push(token);
                                 res.json({
                                    token: token
                                }); 
                            }
                            else {
                                res.json("Wrong Passsword")
                            }
                        }
                        )
                        .catch(err => res.status(400).json(`Error:${err}`))
                }
            }
        })
        .catch(err => res.status(400).json(`Error:${err}`))

})

router.route('/check').post(getUser,(req,res)=>{
    res.json(req.user);
})

function getUser(req,res,next){
    // const authHeader=req.headers['authorization'];

    // const token=authHeader&&authHeader.split(' ')[1];
    const token=req.body.JWTtoken
    // console.log(req.body);

    if(token==null) {return res.sendStatus(401)}
    if(!validToken.includes(token)){return res.sendStatus(401)};
    jsonwebtoken.verify(token,JWT_KEY,(err,user)=>{
        if(err)return res.sendStatus(401)
        req.user=user;
        next();
    })
}

// router.route("/check").post((req,res)=>{
//     console.log(req.cookies)
// console.log(req.body)
// })

router.route("/logout").post((req,res)=>{
validToken=validToken.filter((tokens)=>tokens!==req.body.JWTtoken);
res.json("LOGOUT SUCCESSFULL");
}
)


module.exports = router;