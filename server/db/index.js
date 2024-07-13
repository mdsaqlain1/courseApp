const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username : String,
    password : String,
    purchasedCourses : [{ type : mongoose.Schema.Types.ObjectId, ref: 'Course' }]
  });
  
  const adminSchema = new mongoose.Schema({
    username : String,
    password : String
  })
  
  const courseSchema = new mongoose.Schema({
    title : String,
    description : String,
    price : Number,
    imageLink : String,
    published : Boolean
  })
  
  let Admin = mongoose.model('Admin', adminSchema);
  let User = mongoose.model('User', userSchema);
  let Course = mongoose.model('Course', courseSchema);
  
  module.exports = {
    Admin,
    User,
    Course
  }