import { faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginApi, registerApi } from '../services/allApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginResponseContext } from '../context/Contextshare'


function Auth({register}) {
  const navigate = useNavigate()
  const{ setloginresponse}= useContext(loginResponseContext)
  const [userDetails,setuserDetails] = useState ({
    username :"",
    email :"",
    password :""
  })
  console.log(userDetails);

  const handleRegister =async()=>{
    const{username,email,password} =userDetails
    if(!username || !email || !password){
      toast.info('please fill the form completly')
    }
    else{
      const result = await registerApi({username,email,password})
      console.log(result);
      if(result.status==200){
        toast.success('Registration sucesful')
        setuserDetails({
          username:"",
          email:"",
          password:""
        })
        navigate('/login')
      }
      else if(result.status==406){
        toast.warning(result.response.data)
      }
      else{
        toast.error('soomething went wrong')
      }
      
      console.log(result);
      
    }
  }
  const handleLogin = async()=>{
    const {email,password}=userDetails
    if(!email ||!password ){
      toast.info('please fill the form completely')

    }
    else{
      const result = await loginApi(userDetails)
      console.log(result);
      if(result.status==200){
        toast.success('Login succesful')
        setloginresponse(true)

        sessionStorage.setItem("existinguser",JSON.stringify(result.data.existinguser))
        sessionStorage.setItem("token",result.data.token)

        setuserDetails({
          username:"",
          email:"",
          password:""
        })

        setTimeout(() => {
          navigate('/')
        }, 2000);
        
      
      }
      else if(result.status==406){
        toast.warning(result.response.data)
        setuserDetails({
          username:"",
          email:"",
          password:""
        })
      }
      else{
        toast.error('soomething went wrong')
        setuserDetails({
          username:"",
          email:"",
          password:""
        })
      }
    }
  }
  
  return (
    <>
    <div className="container-fluid">
      <div className="row my-5">
        
        <div className="col-md-1"></div>
        <div className="col-md-10">
      <Link to={'/'}>  <h4 className=' '><FontAwesomeIcon icon={faArrowLeft} /> Back home</h4></Link>
          <div className='row bg-success rounded p-3'>
            <div className="col-md-6 d-flex justify-content-center align-items-center p-5">
              <img src="https://cdn.pixabay.com/photo/2020/06/30/10/23/icon-5355895_1280.png" className='w-75' alt="" />
            </div>
            <div className="col-md-6 pb-4 d-flex flex-column justify-content-center align-items-center ">
              <div className='text-light py-5'>
                <h2><FontAwesomeIcon icon={faStackOverflow} className='me-2' /> Project fair</h2>
               {!register ? <h4>Sign in to your account</h4> :
                <h4>Sign up to your account</h4>}
              </div>
              <div className='w-75'>
                {register && <input type="text" value={userDetails.username} placeholder='username' name="" id="" className='form-control rounded-0 mb-3 ' onChange={(e)=>setuserDetails({...userDetails,username:e.target.value})} />}

                <input type="email"  placeholder='email' name="" id="" className='form-control rounded-0 mb-3 ' value={userDetails.email}  onChange={(e)=>setuserDetails({...userDetails,email:e.target.value})} />

                <input type="password" value={userDetails.password} placeholder='password' className='form-control rounded-0 mb-3'   onChange={(e)=>setuserDetails({...userDetails,password:e.target.value})}/>
               {!register ? <div>
                  <button onClick={handleLogin} className='btn btn-warning rounded-0 p-2 w-100 mb-3'>Login</button>
                  <p className='text-light' >New user? click here to <Link to={'/register'} className='text-danger'>Register</Link></p>
                </div>
                :
                <div>
                  <button className='btn btn-warning rounded-0 p-2 w-100 mb-3 ' onClick={handleRegister} >Register</button>
                  <p className='text-light' >Already a user? click here to <Link to={'/login'} className='text-danger'>Login</Link></p>
                </div>}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-1"></div>
      </div>
    </div>
    <ToastContainer theme='colored' position='top-center' autoClose={2000} />
    </>
  )
}

export default Auth
