import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ApplyJob from './pages/ApplyJob'
import Applications from './pages/Applications'
import RecruiterLogin from './components/RecruiterLogin'
import { useContext, useState } from 'react'
import { AppContext } from './context/AppContext'
import AddJob from './pages/AddJob'
import ManageJob from './pages/ManageJob'
import ViewApplications from './pages/ViewApplications'
import Dashboard from './pages/Dashboard'
import 'quill/dist/quill.snow.css'
import { ToastContainer, toast } from 'react-toastify';

const App = () => {

  const { showRecruiterLogin, companyToken } = useContext(AppContext)
  return (
    <div>
      {showRecruiterLogin && <RecruiterLogin />}
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/apply-jobs/:id' element={<ApplyJob />} />
        <Route path='/applications' element={<Applications />} />
        <Route path='/dashboard' element={<Dashboard />} >
          {companyToken ? <>

            <Route path='add-job' element={<AddJob />} />
            <Route path='manage-jobs' element={<ManageJob />} />
            <Route path='view-applications' element={<ViewApplications />} />
          </> : null}
        </Route>
      </Routes>

    </div>
  )
}

export default App