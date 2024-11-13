import React, { useContext, useEffect, useState } from 'react'
import Addproject from './Addproject'
import Edit from './Edit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { getUserProjectApi, removeUserPRojectApi } from '../services/allApi'
import { Link } from 'react-router-dom'
import { addResponseContext, editResponseContext } from '../context/Contextshare'


function Myproject() {
  const [userproject,setuserproject]=useState([])

  const{addResponse} = useContext(addResponseContext)
  const {editresponse} = useContext(editResponseContext)
 const [removestatus,setremovestatus] = useState({})


  const getuserproject = async()=>{
    if(sessionStorage.getItem("token")){
      const token = sessionStorage.getItem('token')

      const reqHeader={
          "Content-Type":"application/json",
        "Authorization": `Bearer ${token}`
      }
      const result = await getUserProjectApi(reqHeader)
      setuserproject(result.data);
      
    }
  }

  const handleDelete =async(id)=>{
  if(sessionStorage.getItem("token")){
    const token = sessionStorage.getItem("token")

    const reqHeader ={
       "Content-Type":"application/json",
        "Authorization": `Bearer ${token}`
    }

    const result = await removeUserPRojectApi(id,reqHeader)
   if(result.status ==200){
   setremovestatus(result.data)
   }
   else{
    alert('something went wrong')
   }
    
  }
  }

  useEffect(()=>{
    getuserproject()
  },[addResponse,removestatus,editresponse])
 

  return (
    <div className='p-4 shadow w-100'>
      <div className="d-flex mt-4 justify-content-between">
        <h3 className='text-success'>My project</h3>
        <Addproject/>
      </div>


     {userproject?.length>0?
     userproject?.map((item)=>(
      <div className="p-3 bg-light mt-4 rounded-2 d-flex justify-content-between">
      <h4>{item?.title}</h4>
      <div className='d-flex align-items-center'>
          <Edit projects={item}/>
          <Link to={item?.website} target='_blank' ><FontAwesomeIcon icon={faGlobe} className='text-warning me-3' /></Link>
          <Link to={item?.github} target='_blank'><FontAwesomeIcon   icon={faGithub} className='text-success me-3'/></Link>
          <FontAwesomeIcon  icon={faTrashCan} onClick={()=>handleDelete(item?._id)} className='text-Danger me-3' />
      </div>
    </div>
     ))
     
        :
      <h4 className='text-center text-warning mt-5'></h4>}

    </div>
  )
}

export default Myproject
