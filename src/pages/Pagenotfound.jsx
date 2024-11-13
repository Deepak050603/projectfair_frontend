import React from 'react'
import { Link } from 'react-router-dom'

function Pagenotfound() {
  return (
    <div className='container-fluid'>
        <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8 d-flex justify-content-center align-items-center flex-column">
                <img src="https://i.pinimg.com/originals/a3/59/56/a35956ec9f42082d3eeee4ba1b506060.gif" className='w-50' alt="no image" />
                <h1>Look like you're lost</h1>
                <p>The page you are looking for is unavailable</p>
                <Link to={'/'}><button className='btn btn-success  mt-1 rounded-0'>Go Home</button></Link>
            </div>
            <div className="col-md-2"></div>
        </div>
      
    </div>
  )
}

export default Pagenotfound
