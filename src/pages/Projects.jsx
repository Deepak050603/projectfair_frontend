import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import Projuctcard from '../components/Projuctcard'
import { getAllProjectApi } from '../services/allApi'



function Projects() {

  const [allprojet, setallproject] =useState([])
  const [token,settoken] = useState("")

  const [searchkey,setsearchkey] = useState("")

  // console.log(token);
  console.log(searchkey);
  
  

  const getallproject = async()=>{

    if(sessionStorage.getItem("token")){
      const token = sessionStorage.getItem("token")
      const reqHeader = {
        "Content-Type":"application/json",
        "Authorization": `Bearer ${token}`
      }

      const result = await getAllProjectApi(searchkey,reqHeader)
    console.log(result);
    setallproject(result.data)
    }
    
    
  }

  useEffect(()=>{
    getallproject()
  },[searchkey])

  useEffect(()=>{
    
    if(sessionStorage.getItem("token")){
      settoken(sessionStorage.getItem("token"))
    }
  },[])
  return (
    <>
      <Header/>
      <div className='my-5'>
        <h3 className='text-center'>All projects</h3>
        </div>
 { !token ?      
        <div className="container-fluid">
          <div className="row w-100">
            <div className="col-md-3"></div>
            <div className="col-md-6 d-flex justify-content-ceter align-items-center flex-column">
              <img src="https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-30-710_512.gif" className='w-25 mt-5' alt="" />
              <h4 className='text-danger mt-5'>please <Link to={'/login'}>login</Link> to see more project</h4>
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
          :
        <div>
          <div className='mt-5'>
            <div className="container">
              <div className="row">
                  <div className="col-md-4"></div>
                  <div className="col-md-4 d-flex ">
                    <input placeholder='Technologies' onChange={(e)=>setsearchkey(e.target.value)} type="text" className='form-control shadow' />
                    <FontAwesomeIcon icon={faMagnifyingGlass} style={{color:'lightgray',marginTop:'11.5px',marginLeft:'-30px'}} />
                  </div>
                  <div className="col-md-4"></div>
              </div>
            </div>
          </div>
       
            <div className='container-fluid p-5 mt-5'>
              <div className="row">
                {allprojet?.map((item)=>
                 <div className="col-md-3">
                 <Projuctcard project={item}/>
               </div>
                )}
        </div>
             
              
            </div>
          </div>}


    </>
  )
}

export default Projects
