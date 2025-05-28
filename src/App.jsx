
import React from 'react'
import { Route,Routes} from 'react-router-dom'
import SignUp from './Pages/SignUp/SignUp'
import NavbarComp from './Components/Navbar/NavbarComp'
import Login from './Pages/Login/Login'
import RecruiterDah from './Pages/RecruiterDashboard/RecruiterDah'
import JobseekerDashboard from './Pages/RecruiterDashboard/JobseekerDashboard'
import JobPosting from './Pages/RecruiterDashboard/JobPosting/JobPosting'
import MyPostings from './Pages/RecruiterDashboard/MyPostings/MyPostings'


const App = () => {
  return (
    <div>
      <NavbarComp/>
      <Routes>
        
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/recruiterDashboard' element={<RecruiterDah/>}>
         <Route path='post_job'element={<JobPosting/>}> </Route>
        <Route path='my_postings'element={<MyPostings/>}> </Route>
        </Route>
        <Route path='/jobseekerDashboard' element={<JobseekerDashboard/>}> </Route>
       

      </Routes>


    </div>
  )
}

export default App
