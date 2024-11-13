import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectApi } from '../services/allApi';
import { addResponseContext } from '../context/Contextshare';


function Addproject() {
    const [show, setShow] = useState(false);
    const [preview,setpreview] =useState("")
    const [token,settoken] = useState("")
    const [key,setkey] =useState(1)

    const {setaddResponse} = useContext(addResponseContext)
    
    const [projectDetails,setprojectDetails] = useState({
      title:"",
      language :"",
      github :"",
      website :"",
      overview :"",
      projectImage:""

    })
    // console.log(preview);
    // console.log(projectDetails);
    // console.log(token);
    

    const handleFile =(e)=>{
      setprojectDetails({...projectDetails,projectImage:e.target.files[0]})
    }
    

  const handleClose = () => {setShow(false);
    handleCancel()
  }
  const handleShow = () => setShow(true);
 const handleCancel =()=>{
  setprojectDetails({
    title:"",
    language :"",
    github :"",
    website :"",
    overview :"",
    projectImage:""
  })
  setpreview("")
  if(key==1){
    setkey(0)
  }
  else{
    setkey(1)
  }
 }
 const handleAdd = async()=>{
   const {title,language,github,website,overview,projectImage} = projectDetails
   if(!title || !language || !github || !website || !overview || !projectImage){
    toast.info("Please fill the fom completely")
   }
   else{
    const reqBody = new FormData()

    reqBody.append("title",title)
    reqBody.append("language",language)
    reqBody.append("github",github)
    reqBody.append("website",website)
    reqBody.append("overview",overview)
    reqBody.append("projectImage",projectImage)

    if(token){
      const reqHeader = {
        "Content-Type":"multipart/form-data",
        "Authorization": `Bearer ${token}`
      }
      const result = await addProjectApi(reqBody,reqHeader)
      console.log(result);
      if(result.status==200){
        toast.success(' project added successfully')
        setTimeout(() => {
          handleClose()
        }, 2000);
        setaddResponse(result)
       
      }
      else if(result.status==406){
        toast.warning(result.response.data)
        handleCancel()

      }
      else{
        toast.error('something went wrong')
        handleClose()
      }

    }
    else{
      toast.warning('Please login')
    }
   }
 }

useEffect(()=>{
  if(projectDetails.projectImage){
    setpreview(URL.createObjectURL(projectDetails.projectImage))
  }
},[projectDetails.projectImage])

useEffect(()=>{
 if(sessionStorage.getItem("token")){
  settoken(sessionStorage.getItem("token"))
 }
},[])

  return (
   <>
      <div>
        <button onClick={handleShow} className='btn rounded-0 text-light'style={{backgroundColor:'rgb(62,179,24'}}>Add project</button>
        <Modal show={show} onHide={handleClose} size='lg'>
          <Modal.Header closeButton>
            <Modal.Title className='text-success'>Add Project Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <div className="container-fluid">
                  <div className="row">
                      <div className="col-md-6 text-center d-flex align-items-center">
                          <label htmlFor="projectimage">
                              <input id='projectimage' key={key}  onChange={(e)=>handleFile(e)} type="file" style={{display:'none'}} />
                              <img src={preview? preview :"https://uxwing.com/wp-content/themes/uxwing/download/video-photography-multimedia/add-image-photo-icon.png"}p className='w-75' alt="" />
                          </label>
                      </div>
                      <div className="col-md-6">
                          <div className="mb-3">
                              <input type="text" value={projectDetails.title} onChange={(e)=>setprojectDetails({...projectDetails,title:e.target.value})} placeholder='Title' className='form-control' />
                          </div>
                          <div className="mb-3">
                          <input type="text" value={projectDetails.language} placeholder='Languagee' onChange={(e)=>setprojectDetails({...projectDetails,language:e.target.value})} className='form-control' />
                          </div>
                          <div className="mb-3">
                          <input type="text" value={projectDetails.github} placeholder='Github' onChange={(e)=>setprojectDetails({...projectDetails,github:e.target.value})} className='form-control' />
                          </div>
                          <div className="mb-3">
                          <input type="text" value={projectDetails.website} placeholder='Website' onChange={(e)=>setprojectDetails({...projectDetails,website:e.target.value})} className='form-control' />
                          </div>
                          <div className="mb-3">
                              <textarea rows={5} value={projectDetails.overview} className='form-control' onChange={(e)=>setprojectDetails({...projectDetails,overview:e.target.value})} placeholder='Overview'></textarea>
                          </div>
                      </div>
                  </div>
              </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="success" onClick={handleAdd}>
             Add
            </Button>
          </Modal.Footer>
          <ToastContainer theme='colored' position='top-center' autoClose={2000} />
        </Modal>
      </div>
    
   </>
  )
}

export default Addproject
