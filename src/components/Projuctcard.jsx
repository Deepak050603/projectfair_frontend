import React, { useState } from 'react'
import projectphoto from '../assets/scrnshot.png'

import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { serverurl } from '../services/severUrl';
import { height } from '@fortawesome/free-brands-svg-icons/fa42Group';



function Projuctcard({project}) {
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
        <div  className='shadow mt-3 mt-md-0   '>
              <img src={`${serverurl}/upload/${project?.projectImage}`}  onClick={handleShow} alt="no image" className='w-100' style={{height:'220px'}}/>
              <div className='p-3 text-center'>{project?.title}</div>
            </div>

            <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>{project?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <img src={`${serverurl}/upload/${project?.projectImage}`} className='w-100' alt="" />
                    </div>
                    <div className="col-md-6">
                       <h4>Description</h4>
                       <p>{project?.overview} </p>
                       <h4>Technologies</h4>
                       <p>{project?.language}</p>
                    </div>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <div className='d-flex me-auto'>
          <Link to={project?.github} target='_blank'><FontAwesomeIcon icon={faGithub} className='fa-2x ms-3' /></Link>
          <Link to={project?.website} target='_blank'><FontAwesomeIcon icon={faLink} className='fa-2x ms-3' /></Link>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Projuctcard
