import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faStackOverflow, faWhatsapp, faXTwitter } from '@fortawesome/free-brands-svg-icons'
function Footer() {
  return (
    <div className='p-md-5 p-4 bg-success mt-5 '>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <h3 className='text-light'><FontAwesomeIcon icon={faStackOverflow} className='me-2' />Project fair</h3>

                    <p className='mt-3' style={{textAlign:'justify'}}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, debitis nulla ratione illum omnis voluptates inventore. Ex, iste ut facilis atque voluptatum fugiat perspiciatis illum, quasi ipsam voluptatem maiores quo.</p>
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-2 flex-column d-flex justify-content-center ">
                    <h3 className='text-light'>Links</h3>
                    <p className='mt-3'>Home</p>
                    <p> Project</p>
                    <p>Dashboard</p>
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-2">
                <h3 className='text-light'>Guides</h3>
                    <p className='mt-3'>React</p>
                    <p> React-Bootstrap</p>
                    <p>Bootswatch</p>
                </div>
                <div className="col-md-3">
                    <h3 className='text-light'>Contact us</h3>
                    <div className='d-flex mt-3'>
                        <input type="text" placeholder='Email id' className='form-control rounded' />
                        <button className='btn btn-warning rounded-0 ms-2'>Subscribe</button>
                    </div>
                    <div className='d-flex justify-content-between mt-5 text-light'>
                    <FontAwesomeIcon className='fa-2x' icon={faInstagram} />
                    <FontAwesomeIcon className='fa-2x' icon={faFacebook} />
                    <FontAwesomeIcon className='fa-2x' icon={faXTwitter} />
                    <FontAwesomeIcon className='fa-2x' icon={faWhatsapp} />

                    </div>
                </div>
            </div>
        </div>
     
    </div>
  )
}

export default Footer
