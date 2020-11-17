import React,{useState,useEffect} from "react"
import {Redirect, Route} from "react-router-dom"
import axios from "axios"
import { TextField,Button } from '@material-ui/core';
export default function EditBlog(props){
    const requiredBlogID=window.location.href.slice(window.location.href.indexOf("blog")+5)
    const [title, settitle] = useState("")
    const [content, setcontent] = useState("")
    const [done,setdone]=useState(false)
    const [author, setauthor] = useState("")
    const [publish,setPublish]=useState(false)
    useEffect(()=>{
        setdone(true)
        async function doWork(){
            try{
        const res=await axios.post("http://localhost:5000/blogs/",{_id:requiredBlogID});
            settitle(res.data.title);
            setcontent(res.data.content);
                setauthor(res.data.author)
            }
          catch(err){
              console.log("Error: "+ err)
            }
        }
           doWork()
    },[])

    function publishBlog(e){
        e.preventDefault()
        const editBlog={
            _id:requiredBlogID,
            title:title,
            content:content
        }
       async function doWork(){
            try{
        await axios.post("http://localhost:5000/blogs/update",editBlog)
        setPublish(true)
            }
          catch(err){
              console.log("Error: "+ err)
            }
        }
           doWork()

    }


    return(<div>
                {publish?<Redirect to="/"/>:null}
        <form>
            <div>
        <TextField label="Tittle" value={title} onChange={(e)=>settitle(e.target.value)}></TextField>
        <TextField label="Content" value={content} onChange={(e)=>setcontent(e.target.value)}></TextField>
        <Button onClick={(e)=>publishBlog(e)}>Publish</Button>
        </div>
        </form>
    </div>)

}