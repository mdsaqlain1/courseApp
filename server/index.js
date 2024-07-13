const express = require('express');
const mongoose = require('mongoose');
const adminRoutes = require('./routes/admin.js');
const userRoutes = require('./routes/user.js');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);

mongoose.connect("mongodb://127.0.0.1:27017", { dbName: "courses" })
.then(()=>{
    console.log("Connected to DB");
})
.catch((err)=>{
    console.log(err);
});
app.listen(3000, ()=> console.log("Server is running on port 3000"));