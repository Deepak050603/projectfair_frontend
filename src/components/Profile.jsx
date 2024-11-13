import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { serverurl } from '../services/severUrl'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateUserProfileApi } from '../services/allApi';
import Collapse from 'react-bootstrap/Collapse';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

function Profile() {
  const [open, setOpen] = useState(false);
  const[userdetails,setuserdetails] = useState({
    username:"",
    email:"",
    password:"",
    profile:"",
    github:"",
    linkedin:""

  })
  const [updatestatus,setupdatestatus] = useState([])

  const [existingimg,setexistingimg] =useState ("")
  const [preview,setpreview] = useState("")
  // console.log(userdetails);
  // console.log(preview);
  

  const handleFile =(e)=>{
    setuserdetails({...userdetails,profile:e.target.files[0]})
  }

  const handleUpdate = async()=>{
    const {username,email,password,profile,github,linkedin} = userdetails
    if(!github || ! linkedin){
      toast.info('please fill the form cpmletely')
    }
    else{
      const reqBody = new FormData()
      reqBody.append("username",username)
      reqBody.append("email",email)
      reqBody.append("password",password)
      reqBody.append("github",github)
      reqBody.append("linkedin",linkedin)
      preview? reqBody.append("profile",profile): reqBody.append("profile",existingimg)

      const token = sessionStorage.getItem("token")

      if(preview){
        const reqHeader = {
          "Content-Type":"multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
        const result = await updateUserProfileApi(reqBody,reqHeader)
       if(result.status == 200 ){
        toast.success("updated succesfully")
        sessionStorage.setItem("existinguser",JSON.stringify(result.data))
        setupdatestatus(result)
       }
       else{
        toast.error('something went wrong')
       }
        
      }
      else{
        const reqHeader={
          "Content-Type":"application/json",
        "Authorization": `Bearer ${token}`
    

      }
      const result = await updateUserProfileApi(reqBody,reqHeader)
      if(result.status == 200 ){
        toast.success("updated succesfully")
        sessionStorage.setItem("existinguser",JSON.stringify(result.data))
        setupdatestatus(result)
       }
       else{
        toast.error('something went wrong')
       }
      }

    }
  }




  useEffect(()=>{
    if(userdetails.profile){
      setpreview(URL.createObjectURL(userdetails.profile))
    }
  },[userdetails.profile])

  useEffect(()=>{
    if(sessionStorage.getItem("existinguser")){
      const user = JSON.parse(sessionStorage.getItem("existinguser"))
      console.log(user);
      setuserdetails({...userdetails,username:user.username,email:user.email,password:user.password,github:user.github,linkedin:user.linkedin})
      setexistingimg(user.profile)
    }
  },[updatestatus])
  
  return (
    <>
      <div className='p-4 shadow' onMouseEnter={()=>setOpen(true)} onMouseLeave={()=>setOpen(false)}>
        <div className="d-flex justify-content-between">
          <h3 style={{color:'rgb(62,179,24'}}>Profile</h3>
          <button className='btn'  onClick={() => setOpen(!open)} style={{borderColor:'rgb(160,98,192)',color:'rgb(160,98,192)'}}>{open==true?<FontAwesomeIcon icon={faAngleUp} />
          :
          <FontAwesomeIcon icon={faAngleDown} />}
          </button>
        </div>
  
  
       
        <Collapse in={open}>
            <div>
              <div className="d-flex justify-content-center align-items-center flex-column mt-4">
                <label htmlFor="profileimage" className='mb-4 d-flex justify-content-center align-items-center '>
                    <input id='profileimage' type="file" style={{display:'none'}} onChange={(e)=>{handleFile(e)}} />
                    {existingimg==""?
                      <img src={preview?preview:"https://icon-library.com/images/profile-picture-icon/profile-picture-icon-0.jpg"} className='w-50' alt="" />
                          :
                    <img src={preview?preview:`${serverurl}/upload/${existingimg}`} style={{borderRadius:'50%',height:'150px',width:'150px'}} alt="" />}
                </label>
        
                <div className='w-100'>
                    <div className="mb-3">
                        <input type="text" value={userdetails?.github} className='form-control' onChange={(e)=>setuserdetails({...userdetails,github:e.target.value})}  placeholder='github'/>
                    </div>
                    <div className="mb-3">
                        <input type="text" value={userdetails?.linkedin} className='form-control' onChange={(e)=>setuserdetails({...userdetails,linkedin:e.target.value})}  placeholder='Linkedin'/>
                    </div>
                    <div className="mb-3">
                        <button className='btn btn-success w-100' onClick={handleUpdate}>Update</button>
                    </div>
                </div>
              </div>
            </div>
            </Collapse>
          
      
        
      </div>
     
    </>
  )
}

export default Profile
