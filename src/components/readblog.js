import React,{useState,useEffect} from "react";
import axios from "axios";
export default function ReadBlog(props){
    const requiredBlogID=window.location.href.slice(window.location.href.indexOf("blog")+5)
    const [blog, setblog] = useState({})
    useEffect(()=>{
        // console.log("meow")
        async function doWork(){
            try{
        await axios.post("http://localhost:5000/blogs/addview",{_id:requiredBlogID})
        const response=await axios.post("http://localhost:5000/blogs/",{_id:requiredBlogID});
        setblog(response.data)

            }
          catch(err){
              console.log("Error: "+ err)
            }
        }
           doWork()
    },[])
    function addLike(){
         axios.post("http://localhost:5000/blogs/addlike",{_id:requiredBlogID})
            .then(()=>{})
            .catch((err)=>{
                console.log("Error: "+ err)
              })
    }
    return(
        <div>
            {blog.title}{blog.content}{blog.author}{blog.likes}{blog.views}
            <button onClick={()=>addLike()}>Like</button>
        </div>
    )

}