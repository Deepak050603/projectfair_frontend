import { faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { loginResponseContext } from '../context/Contextshare'


function Header() {

  const [token,settoken] = useState("")

  const{ setloginresponse} = useContext(loginResponseContext)

  const navigate = useNavigate()

   const handleLogout =()=>{
    sessionStorage.removeItem("existinguser")
    sessionStorage.removeItem("token")
    setloginresponse(false)

    navigate('/')
   
   }
   
  useEffect(()=>{
    if(sessionStorage.getItem("token")){
  settoken(sessionStorage.getItem("token"))
    }
  })

  return (
    <>
     <Navbar className="bg-success d-flex align-items-center">
        <Link to={'/'} style={{textDecoration:'none'}}>
          <Navbar.Brand className='text-light'>
          <span className='fs-3 ms-md-5 rounded-0'> <FontAwesomeIcon icon={faStackOverflow} className='me-2' /> Project fair</span>
            
          </Navbar.Brand>
        </Link>
        {token &&<button onClick={handleLogout} className='btn btn-warning ms-auto me-5'><FontAwesomeIcon icon={faPowerOff} /> Logout</button>}
      </Navbar>
    </>
  )
}

export default Header
