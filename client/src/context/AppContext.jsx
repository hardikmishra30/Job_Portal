import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth, useUser } from "@clerk/clerk-react";

export const AppContext = createContext()

export const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const { user } = useUser()
    const { getToken } = useAuth()


    const [searchFilter, setSearchFilter] = useState({
        title: '',
        location: '',
    })

    const [isSearched, setIsSearched] = useState(false)

    const [jobs, setJobs] = useState([])

    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false)


    // After completing the backend
    const [companyToken, setCompanyToken] = useState(() => {
        try {
            return localStorage.getItem('companyToken') || null
        } catch (e) {
            return null
        }
    })
    const [companyData, setCompanyData] = useState(null)

    const [userData, setUserData] = useState(null)
    const [userApplications, setUserApplications] = useState([])



    //Function to fetch jobs data 
    const fetchJobs = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/jobs')

            if (data.success) {
                setJobs(data.jobs)
                console.log(data.jobs)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
        // TODO: TO BE FETCHED WHILE MAKING THE BACKEND - done
    }

    // Function to fetch company Data
    const fetchCompanyData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/company/company', { headers: { token: companyToken } })

            if (data.success) {
                setCompanyData(data.company)
                console.log(data)
            } else {
                toast.error(data.message)
                // invalid token or fetch failure - clear stored token to avoid inconsistent UI
                setCompanyToken(null)
                localStorage.removeItem('companyToken')
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // Function to  fetch user data 
    const fetchUserData = async () => {
        try {

            const token = await getToken()
            const { data } = await axios.get(backendUrl + '/api/users/user', { headers: { Authorization: `Bearer ${token}` } })

            if (data.success) {
                setUserData(data.user)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)

        }
    }

    // function to fetch user's applied application data
    const fetchUserApplications = async () => {
        try {

            const token = await getToken()
            const { data } = await axios.get(backendUrl + '/api/users/applications', { headers: { Authorization: `Bearer ${token}` } }
            )
            if (data.success) {
                setUserApplications(data.applications)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const value = {
        setSearchFilter, searchFilter,
        isSearched, setIsSearched,
        jobs, setJobs,
        showRecruiterLogin, setShowRecruiterLogin,
        companyToken, setCompanyToken,
        companyData, setCompanyData,
        backendUrl,
        userData, setUserData,
        userApplications, setUserApplications,
        fetchUserData, fetchUserApplications
    }

    // next we have to execute this function when the clients job get loaded 
    useEffect(() => {
        fetchJobs()
    }, [])

    useEffect(() => {
        if (companyToken) {
            fetchCompanyData()
        }
    }, [companyToken])

    useEffect(() => {
        if (user) {
            fetchUserData()
            fetchUserApplications()
        }
    }, [user])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}