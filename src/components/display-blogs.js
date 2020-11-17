import React,{useState,useEffect} from "react";
import {Link} from "react-router-dom"
import axios from "axios"
import { Button } from "@material-ui/core";
import "../style/displayblog.css"
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function DisplayBlog(props){
    const [blogs,updateBlogs]=useState([])
const [temp, settemp] = useState(0)
    const sortByViews=function (a,b){
        return b.views-a.views
    }

    const sortByLikes=function (a,b){
        return b.likes-a.likes
    }
    function sortByName(a,b){
        if (a.title>b.title){
            return 1;
        }
    else    if (a.title<b.title){
        return -1;}
        else return 0
    }

    
    useEffect(()=>{

    axios.post("http://localhost:5000/blogs/",{username:props.requiredUser})
    .then((res)=>{

        updateBlogs(res.data)

    })
    .catch((err)=>console.log("Error: "+ err))  
    },[])
    function print(){
        var editButton
            return(

            blogs.map(blog=>{
                blog.author===props.userviewing?editButton=<Link to ={"editblog/"+blog._id}><Button>Edit</Button></Link>:editButton=null
                return (
                    <li className="list-item">

                    <Link to={"/blog/"+blog._id} >
                    <span className="temp">
                    <span className={"blog-title"}>{blog.title}</span>
                <span className="blog-content">{blog.content}</span>
                </span>
                <span className="author-details">{blog.author}{editButton}</span>
                </Link>
                <span className="views-likes"> <span className="likes"><ThumbUpAltIcon/>{blog.likes}</span><span className="views"><VisibilityIcon/>{blog.views}</span></span>
                </li>
                )
                })
            )
        

    }
    function sortBar(){
        console.log(document.getElementById("drop-menu").style.opacity)
        console.log(document.getElementById("drop-menu").style.pointerEvents)
        if(document.getElementById("drop-menu").style.opacity==0){
            console.log("meow")
            document.getElementById("drop-menu").style.opacity=1;
            document.getElementById("drop-menu").style.pointerEvents="all"
        }
        else{
            document.getElementById("drop-menu").style.opacity=0;
            document.getElementById("drop-menu").style.pointerEvents="none"
        }
    }


        return(
            <div>
                <ul className="sorting-buttons">
                     <Button onClick={()=>{sortBar()}}> SORT BY <ExpandMoreIcon className="down-arrow"/></Button>
                <div id="drop-menu" className="real-sorting-buttons">
            <li onClick={()=>{updateBlogs(blogs.sort(sortByLikes));settemp(temp^1);sortBar()}}>Likes</li>
            <li onClick={()=>{updateBlogs(blogs.sort(sortByViews));settemp(temp^1);sortBar()}}>Views</li>
            <li onClick={()=>{updateBlogs(blogs.sort(sortByName));settemp(temp^1);sortBar()}}>Name</li>
            </div>
            </ul>
            <ul className={"blogs-list"}>
          { print()}
          </ul>
            </div>
        )
}

export default DisplayBlog