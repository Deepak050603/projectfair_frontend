import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { serverurl } from '../services/severUrl';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateUserProjectApi } from '../services/allApi';
import { editResponseContext } from '../context/Contextshare';


function Edit({projects}) {
    const [show, setShow] = useState(false);

    const [key,setkey] = useState(0)
    const {seteditresponse} = useContext(editResponseContext)


    const [projectdetails,setprojectdetails]=useState({
      title:projects.title,
    language :projects.language,
    github :projects.github,
    website :projects.website,
    overview :projects.overview,
    projectImage:""
    })

    const [preview,setpreview] = useState("")

    // console.log(projectdetails);
    

  const handleClose = () => {
    setShow(false);
    handleCancel()
  }
  const handleShow = () => setShow(true);

  const handlefile=(e)=>{
    setprojectdetails({...projectdetails,projectImage:e.target.files[0]})
  }

  const handleCancel =()=>{
    setprojectdetails({
      title:projects.title,
      language :projects.language,
      github :projects.github,
      website :projects.website,
      overview :projects.overview,
      projectImage:""
    })
    setpreview("")
    if(key==0){
      setkey(1)
    }
    else{
      setkey(0)
    }
   
  }
  const handleupdate=async()=>{
    const{title,language,github,website,overview,projectImage}=projectdetails
    if(!title || !language || !github || !website || !overview ){
      toast.info('please fill the form completely')
    }
    else{
      // reqbody
      const reqBody = new FormData ()
      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("github",github)
      reqBody.append("website",website)
      preview?reqBody.append("projectImage",projectImage):reqBody.append("projectImage",projects.projectImage)
      
      const token = sessionStorage.getItem("token")

      if(preview){
        const reqHeader = {
          "Content-Type":"multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
        const result = await updateUserProjectApi(projects._id,reqBody,reqHeader)
        console.log(result);
        if(result.status==200){
          seteditresponse(result.data)
          handleClose()
          toast.success('project updated succesfully')
        }
        else{
          handleCancel()
          toast.error('something went wrong')
        }
        
      }
      else{
        const reqHeader={
          "Content-Type":"application/json",
        "Authorization": `Bearer ${token}`
      }
      const result = await updateUserProjectApi(projects._id,reqBody,reqHeader)
      console.log(result);
      if(result.status==200){
        seteditresponse(result.data)
        handleClose()
        toast.success('project updated succesfully')
      }
      else{
        handleCancel()
        toast.error('something went wrong')
      }
      }

    }
  }

  useEffect(()=>{
    if(projectdetails.projectImage){
      /* console.log(URL.createObjectURL(projectdetails.projectImage)); */
      
   setpreview(URL.createObjectURL(projectdetails.projectImage)) 
    }
  },[projectdetails.projectImage])
  // console.log(preview);
  
  
  return (
    <>
  <FontAwesomeIcon onClick={handleShow} icon={faPenToSquare} style={{color:'rgb(160,98,192'}} className=' mx-3'  />
  <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title className='text-success'>Add Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6 text-center d-flex align-items-center">
                        <label htmlFor="projectimage">
                            <input id='projectimage' onChange={(e)=>handlefile(e)} key={key} type="file" style={{display:'none'}} />
                            <img src={preview? preview :`${serverurl}/upload/${projects.projectImage}`} className='w-75' alt="" />
                        </label>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <input type="text" value={projectdetails.title} onChange={(e)=>setprojectdetails({...projectdetails,title:e.target.value})} placeholder='Title' className='form-control' />
                        </div>
                        <div className="mb-3">
                        <input type="text" onChange={(e)=>setprojectdetails({...projectdetails,language:e.target.value})}  value={projectdetails.language} placeholder='Languagee' className='form-control' />
                        </div>
                        <div className="mb-3">
                        <input type="text" onChange={(e)=>setprojectdetails({...projectdetails,github:e.target.value})}  value={projectdetails.github} placeholder='Github' className='form-control' />
                        </div>
                        <div className="mb-3">
                        <input type="text"  onChange={(e)=>setprojectdetails({...projectdetails,website:e.target.value})} value={projectdetails.website} placeholder='Website' className='form-control' />
                        </div>
                        <div className="mb-3">
                            <textarea rows={5} onChange={(e)=>setprojectdetails({...projectdetails,overview:e.target.value})}  value={projectdetails.overview} className='form-control' placeholder='Overview'></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleupdate}>
           Update
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer theme='colored' position='top-center' autoClose={2000} />
    </>
  )
}

export default Edit
