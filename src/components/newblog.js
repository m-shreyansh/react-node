import React,{useState,useEffect} from "react"
import {Redirect, Route} from "react-router-dom"
import axios from "axios"
import { TextField,Button } from '@material-ui/core';
export default function AddBlog(props){
    const [title, settitle] = useState("")
    const [content, setcontent] = useState("")
    const [done,setdone]=useState(false)
    const [publish,setPublish]=useState(false)
    useEffect(()=>{
        setdone(true)
        axios.post("http://localhost:5000/unpublished/load",{username:props.username})
            .then((res)=>{
                settitle(res.data.title)
                setcontent(res.data.content)
            })
            .catch((err)=>console.log("Error: "+ err))    

    },[])
    function updateContent(e){
        setcontent(e.target.value)
        axios.post("http://localhost:5000/unpublished/update",{
            username:props.username,
            content:content,
            title:title
        })
        .then((res)=>{})
        .catch((err)=>console.log("Error: "+ err))  
    }

    function updateTitle(e){
        settitle(e.target.value)
        axios.post("http://localhost:5000/unpublished/update",{
            username:props.username,
            content:content,
            title:title
        })
        .then((res)=>{})
        .catch((err)=>console.log("Error: "+ err))  
    }

    function publishBlog(e){
        e.preventDefault()
        const newBlog={
            title:title,
            author:props.username,
            content:content
        }
       async function doWork(){
            try{
        await axios.post("http://localhost:5000/blogs/newblog",newBlog)
        await axios.post("http://localhost:5000/unpublished/delete",{username:props.username});
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
        {((props.username===null)&&(done===true))?<Redirect to="/login"/>:(
            <div>
        <TextField label="Tittle" value={title} onChange={(e)=>updateTitle(e)}></TextField>
        <TextField label="Content" value={content} onChange={(e)=>updateContent(e)}></TextField>
        <Button onClick={(e)=>publishBlog(e)}>Publish</Button>
        </div>
        )}
        </form>
    </div>)
}
