import { height } from '@fortawesome/free-brands-svg-icons/fa42Group'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import photo from '../assets/project-management-copy.png'
import { Link } from 'react-router-dom'
import Projuctcard from '../components/Projuctcard'
import { homeProjectApi } from '../services/allApi'

function Home() {
  const [isLogin,setIsLogin] =useState(false)
  const [homeproject,sethomeproject] = useState([])

  const getHomeProject = async()=>{
    const result = await homeProjectApi()
    console.log(result);

    sethomeproject(result.data)
    
  }

  useEffect(()=>{
    getHomeProject()
    if(sessionStorage.getItem("token")){
      setIsLogin(true)
    }
    else{
      setIsLogin(false)
    }
  },[])
  return (
   <>
      <div style={{height:'100vh'}} className='bg-success px-md-5'>
        <div className="container-fluid">
          <div className="row ps-md-5 p-5 d-flex  align-items-center pt-md-5  ">
              <div className="col-md-6  ">
                 <div className='ps-5 d-flex align-items-center '>
                   <div >
                      <h1 style={{fontSize:'70px',color:'white'}}>Project Fair</h1>
                      <p>one stop destination for all software deelopment project</p>
                    { isLogin==false ? <Link to={'/login'}> <button className='btn btn-warning p-2 text-light p-0 mt-3 me-3'>Get started<FontAwesomeIcon icon={faArrowRight} /></button></Link>
                    :
                      <Link to={'/dashboard'}><button className='btn btn-dark p-2 text-light p-0 mt-3'>Manage Project<FontAwesomeIcon icon={faArrowRight} /></button></Link>}
                   </div>
                 </div>
                  
              </div>
              <div className="col-md-6 mt-5 mt-md-0 ">
                 <div className=' d-flex align-items-center'> 
                  <img src="https://www.pinclipart.com/picdir/big/568-5688378_poster-project-management-png-clipart.png" alt="no image "className='w-75 pt-4' />
                  </div>
              </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className='text-center my-5'>Explore our Projects</h2>
        <div className='row w-100 px-5'>
          {homeproject?.map((item)=>
            <div className="col-md-4">
            <Projuctcard project={item}/>
             </div>
          ) }
          
        </div>
        
      </div>
      <div>
         <Link to={'/projects'}> <p className='text-center mt-5'>see more projects</p></Link>
        </div>
   </>
  )
}

export default Home
