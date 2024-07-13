const express = require('express');
const {Course, Admin} = require('../db/index.js');
const jwt = require('jsonwebtoken');
const { SECRET, authenticateJwt } = require('../middlewares/auth');

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { username } = req.body;
    const admin = await Admin.findOne({ username });
    if (admin) {
      res.status(403).json({ message: "Admin Already Exists" });
    } else {
      const newAdmin = new Admin(req.body);
      newAdmin.save();
      const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: "1hr" });
      res.json({ message: "Admin created succesfully", token });
    }
  });
  
  router.post('/login', async (req, res) => {
    const {username, password} = req.body;
    const admin = await Admin.findOne({username, password});
    if(admin){
      const token = jwt.sign({username, role:"admin"}, SECRET, {expiresIn: '1hr'});
      res.json({message: "Admin logged in successfully", token});
    }else{
      res.json({message:"Admin not found"});
    }
  });
  
  router.post('/courses', authenticateJwt, async (req, res) => {
    const course = new Course(req.body);
    await course.save();
    res.json({message : "Course created sucessfully", courseId : course.id});
  });

  router.get('/courses', authenticateJwt, async (req, res) => {
    const courses = await Course.find({})
    res.json({courses});
  });
  
  router.put('/courses/:courseId',authenticateJwt, async (req, res) => {
    const courseId = req.params.courseId;
    const course = await Course.findByIdAndUpdate(courseId, req.body);
    if(course){
      res.json({message : "Course updated successfully", course});
    }else{
      res.json({message : "Course not found"});
    }
  });

  router.get('/courses/:courseId',authenticateJwt, async (req, res) => {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);
    res.json({course})
  });

  router.delete('/courses/:courseId',authenticateJwt, async (req, res) => {
    const courseId = req.params.courseId;
    const course = await Course.deleteOne({_id : courseId});
    res.json({course})
  });

  router.get('/me', authenticateJwt, async (req, res) => {
    res.json({username : req.user.username});
  });
 
module.exports = router