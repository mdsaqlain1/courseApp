import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react"
import Card from '@mui/material/Card';
import { useNavigate } from "react-router-dom";

function Courses(){
    const [course, setCourse] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/admin/courses/",{
            method : "GET",
            headers : {
                "Content-type" : "applicaiton/json",
                "Authorization" : "Bearer " + localStorage.getItem("token"),
            }
        })
        .then((res) => {
            res.json()
            .then((data) => {
                console.log(data)
                setCourse(data.courses)
            })
        })
    },[])
    return (
        <div style={{marginTop :"70px" ,display : "flex", justifyContent: "center", flexWrap : "wrap"}}>
            {course.map((course) => {
                return <Course key = {course.id} course={course}></Course>
            })}
        </div>
    )
}
export function Course({course}){
    console.log(course)
    let navigate = useNavigate();
    return (
        <div style={{margin : "10px"}}>
            <Card style={{width: "320px", padding: "20px"}}>
                <Typography variant="h4">{course.title}</Typography>
                <Typography variant="subtitle2">{course.description}</Typography>
                <img src = {course.imageLink} width={"320px"} height={"200"} alt="" />
                <Typography variant="subtitle2" style={{margin:5}}>Rs. {course.price}</Typography>
                <Button variant="contained" color="success" style={{marginRight:10}}
                    onClick={()=>{
                        navigate("/course/" +course._id)
                    }}
                >Edit</Button>
                <Button variant="contained" color="error"
                    onClick={()=>{
                        fetch("http://localhost:3000/admin/courses/" + course._id,{
                    method : "DELETE",
                    body : JSON.stringify({ 
                        title : course.title,
                        description : course.description,
                        imageLink : course.imageLink,
                        published : true,
                    }),
                    headers : {
                        "Content-type" : "application/json",
                        "Authorization" : "Bearer " + localStorage.getItem("token") 
                    }
                })
                .then((res) =>{
                    res.json()
                })

                window.location = "/courses"
            }}
                >Delete</Button>
            </Card>
        </div>
    )
}

export default Courses