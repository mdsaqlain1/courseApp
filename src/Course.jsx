import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios";

function Course(){
    const {courseId} = useParams();
    const [course, setCourse] = useState(null);
    
    useEffect(() => {
        axios.get("http://localhost:3000/admin/courses/" + courseId,{
            headers : {
                "Authorization" : "Bearer " + localStorage.getItem("token"),
            }
        })
        .then((res) => {
            setCourse(res.data.course)
        });
    },[courseId])
    if(!course){
        return(
            <div>
                loading....
            </div>
        )
    }
    return (
        <div style={{display : "flex", justifyContent: "center", flexWrap : "wrap", marginTop: 60}}>
            <Background title={course.title} img={course.imageLink}></Background>
            <UpdateCard  course={course} setCourse={setCourse}/>
            <CourseCard  course={course}></CourseCard>
        </div>
    )
}

function Background({title, img}){
    return (
        <div style={{backgroundColor:"black", color:"white", height : "200px", width: "100vw", display:"flex", justifyContent:"center", alignItems:"center", marginBottom:"10px"}}>
            <Typography variant="h4">{title}</Typography>
        </div>
    )
}
 function CourseCard(Props){
    return (
        <div style={{margin : "10px"}}>
            <Card style={{width: "300px", padding: "20px", marginBottom: "20px"}}>
                <Typography variant="h4">{Props.course.title}</Typography>
                <Typography variant="subtitle2">{Props.course.description}</Typography>
                <img src = {Props.course.imageLink} width={"300px"} alt="" />
                <Typography variant="subtitle2" style={{margin:5}}>Rs.{Props.course.price}</Typography>
            </Card>
        </div>
    )
}
function UpdateCard(Props){
    const [title, setTitle] = useState(Props.course.title);
    const [description, setDescription] = useState(Props.course.description);
     const [imageLink, setImageLink] = useState(Props.course.imageLink);
    const [price, setPrice] = useState(Props.course.price);
    const courseId = Props.course._id;
    const setCourse = Props.setCourse;


    return (
        <div style={{margin : "10px"}}>
            <Card style={{width: "450px", padding: "20px", marginBottom: "20px"}}>
            <div className='mb-5'><TextField className='inputW' id="outlined-basic" label="Title" variant="outlined" type='text' value={title} onChange={(e) => setTitle(e.target.value)}/></div>
            <div className='mb-5'><TextField className='inputW' id="outlined-basic" label="Description" variant="outlined" type='text' value={description} onChange={(e) => setDescription(e.target.value)}/></div>
            <div className='mb-5'><TextField className='inputW' id="outlined-basic" label="Imagelink" variant="outlined" type='text' value={imageLink} onChange={(e) => setImageLink(e.target.value)}/></div>
            <div className='mb-5'><TextField className='inputW' id="outlined-basic" label="Price" variant="outlined" type='text' value={price} onChange={(e) => setPrice(e.target.value)}/></div>
            <Button variant="contained" className='Block' color="success" onClick={() =>{
                console.log(title)
                console.log(description)
                fetch("http://localhost:3000/admin/courses/" + courseId,{
                    method : "PUT",
                    body : JSON.stringify({ 
                        title,
                        description,
                        imageLink : imageLink,
                        published : true,
                        price
                    }),
                    headers : {
                        "Content-type" : "application/json",
                        "Authorization" : "Bearer " + localStorage.getItem("token") 
                    }
                })
                .then((res) =>{
                    res.json()
                })
                let updatedCourse ={
                    _id : courseId,
                    title,
                    description,
                    imageLink,
                    price
                }
                setCourse(updatedCourse);
            }}>Update Course</Button>
            </Card>
        </div>
    )
}
export default Course;