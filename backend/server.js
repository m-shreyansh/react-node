const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const usersRouter = require('./routes/users');
const profileRouter = require("./routes/profile")
const blogsRouter=require('./routes/blogs')
const unpublishedblogsRouter=require('./routes/unpublished')
const cookieParser= require("cookie-parser");


require('dotenv').config();

const app=express();
const port=process.env.PORT || 5000;

app.use(cors())
app.use(express.json());
app.use('/users',usersRouter)
app.use('/profile',profileRouter)
app.use('/blogs',blogsRouter)
app.use('/unpublished',unpublishedblogsRouter)
app.use(cookieParser());

const uri=process.env.ATLAS_URI||"mongodb://localhost/kaka";

mongoose.connect(uri,{ useNewUrlParser: true, useCreateIndex: true })

const connection =mongoose.connection
connection.once('open',()=>{console.log(`Database connected`)})

app.listen(port,()=>{console.log(`Listening on port ${port}`)})