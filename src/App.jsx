
import React from 'react'
import { Route,Routes} from 'react-router-dom'
import SignUp from './Pages/SignUp/SignUp'
import NavbarComp from './Components/Navbar/NavbarComp'
import Login from './Pages/Login/Login'
import RecruiterDah from './Pages/RecruiterDashboard/RecruiterDah'
import JobseekerDashboard from './Pages/RecruiterDashboard/JobseekerDashboard'


const App = () => {
  return (
    <div>
      <NavbarComp/>
      <Routes>
        
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/recruiterDashboard' element={<RecruiterDah/>}></Route>
        <Route path='/jobseekerDashboard' element={<JobseekerDashboard/>}></Route>

      </Routes>


    </div>
  )
}

export default App
