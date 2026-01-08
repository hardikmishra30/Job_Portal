// Crazy file loved clerk

import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {

  const { openSignIn } = useClerk() // whenever we open sign in option then it will open the sign in popup
  const { user } = useUser()

  const navigate = useNavigate()

  const { setShowRecruiterLogin } = useContext(AppContext)
  const { companyToken, companyData, setCompanyToken, setCompanyData } = useContext(AppContext)

  const companyLogout = () => {
    setCompanyToken(null)
    localStorage.removeItem('companyToken')
    setCompanyData(null)
    navigate('/')
  }

  return (
    <div className='shadow py-4'>

      <div className='container px-4 2xl:px-20 mx-auto flex justify-between items-center'>
        <img width={160} src={companyToken ? (companyData?.image || assets.logo) : assets.logo} onClick={() => navigate('/')} className='cursor-pointer' alt="" />
        {
          companyToken ? (
            <div className='flex items-center gap-3'>
              <Link to={'/dashboard'}>Dashboard</Link>
              <p>|</p>
              <p className='max-sm:hidden'>Hi! {companyData?.name || 'Company'}</p>
              <div className='relative group'>
                <img className='w-8 h-8 rounded-full' src={companyData?.image || assets.profile_img} alt="company" />
                <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12 '>
                  <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm'>
                    <li onClick={companyLogout} className='py-1 px-2 cursor-pointer pr-10 '>Logout</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : user ? (
            <div className='flex items-center gap-3'>
              <Link to={'/applications'}>Applied Jobs</Link>
              <p>|</p>
              <p className='max-sm:hidden'>Hi! {user.firstName + " " + user.lastName}</p>
              <UserButton />
            </div>
          ) : (
            <div className='flex gap-4 max-sm:text-xs'>
              <button onClick={e => setShowRecruiterLogin(true)} className='text-gray-600'>Recruiter Login</button>
              <button onClick={(e) => openSignIn()} className='bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full'>Login</button>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Navbar