const express = require('express');
const { Course, User } = require('../db');
const jwt = require('jsonwebtoken');
const { SECRET, authenticateJwt } = require('../middlewares/auth');

const router = express.Router();

router.post('/signup', async (req, res) => {
    const {username} = req.body;
    const user = await User.findOne({username});
    if(user){
      res.status(403).json({message : "User already exists"});
    }else{
      const newUser = new User(req.body);
      newUser.save();
      jwt.sign({newUser, role : 'user'}, SECRET, {expiresIn : '1hr'});
      res.json({message : "User created sucessfully"});
    }
  });
  
  router.post('/login', async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username, password});
    if(user){
      jwt.sign({username, role : 'user'}, SECRET, {expiresIn : '1hr'});
      res.json({message : "User logged in sucessfully"});
    }else{
      res.status(403).json({message : "Invalid username or password"});
    }
  });
  
  router.get('/courses', authenticateJwt, async(req, res) => {
    const courses = await Course.find({published : true});
    res.json({courses});
  });
  
  router.post('/courses/:courseId', authenticateJwt, async(req, res) => {
    const course = await Course.findOne(req.params.courseId);
    if(course){
      const user = await User.findOne({username : req.user.username});
      if(user){
        user.purchasedCourses.push(course);
        await user.save();
        res.json({message : "Course purchases sucessfully"});
      }else{
        req.json({message : "User not found"});
      }
    }else{
      req.status(403).json({message : "Course not found"});
    }
  });
  
  router.get('/purchasedCourses', authenticateJwt, async (req, res) => {
    const {username} = req.body;
    const user = await User.findOne({username}).populate('purchasedCourses');
    if(user){
      res.json({courses : user.purchasedCourses || []});
    }else{
      res.send(403).json({message : 'No course found'});
    }
  });

  module.exports = router;