import './index.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { Card } from '@mui/material';
import axios from 'axios';

function AddCourse(){
    const[title , setTitle] = useState("");
    const[description, setDescription] = useState("");
    const[imageLink, setImagaLink] = useState("");
    const[price, setPrice] = useState(0)

    return (
        <div style={{display : "flex", justifyContent:"center", alignItems: "center", height:"90vh", marginTop:50}}>
            <Card style={{width : "600px", padding : 20, borderRadius: 10}}>
            <div className='mb-5'><TextField className='inputW' id="outlined-basic" label="Title" variant="outlined" type='text' value={title} onChange={(e) => setTitle(e.target.value)}/></div>
            <div className='mb-5'><TextField className='inputW' id="outlined-basic" label="Description" variant="outlined" type='text' value={description} onChange={(e) => setDescription(e.target.value)}/></div>
            <div className='mb-5'><TextField className='inputW' id="outlined-basic" label="Imagelink" variant="outlined" type='text' value={imageLink} onChange={(e) => setImagaLink(e.target.value)}/></div>
            <div className='mb-5'><TextField className='inputW' id="outlined-basic" label="Price" variant="outlined" type='text' value={price} onChange={(e) => setPrice(e.target.value)}/></div>
            <Button variant="contained" className='Block' color='success'
            onClick={async () =>{
                await axios.post("http://localhost:3000/admin/courses",{
                        title,
                        description,
                        price,
                        imageLink : imageLink,
                        published : true
                },{
                    headers : {
                        "Authorization" : "Bearer " + localStorage.getItem("token") 
                    }
                });
                alert("Course added");
            }}>Add Course</Button>
            </Card>
        </div>
    )
}

export default AddCourse