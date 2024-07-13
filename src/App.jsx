import SignUp from './SignUp'
import SignIn from './SignIn'
import AppBar from './AppBar'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import AddCourse from './AddCourse'
import Courses from './Courses'
import Course from './Course'
import Error from './Error'
import AppBar2 from '../compnents/AppBar'

function App() {
  return (
    <>
      <Router>
      <AppBar/>
        {/* <AppBar2/> */}
        <Routes>
          <Route path='/error' element = {<Error/>}/>
          <Route path='/course/:courseId' element = {<Course/>}/>
          <Route path='/courses' element = {<Courses/>}/>
          <Route path="/addcourse" element = {<AddCourse/>}/>
          <Route path="/login" element = {<SignIn/>}/>
          <Route path="/" element = {<SignUp/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
