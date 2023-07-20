import React, { useContext, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { userData } from '../configs/userData';
import { useNavigate } from 'react-router-dom';

function NavBar2() {
    const val = useContext(userData)
    const navigate = useNavigate()
    useEffect(()=>{
        if(!val.user){
            navigate('/login',{replace:true})
        }
    })
  return (
   
<Navbar expand="lg" bg="dark" data-bs-theme="dark" className="bg-body-tertiary">
<Container>
  <Navbar.Brand onClick={()=>navigate('/',{replace:true})} className="cursor-point">Get Done</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="me-auto">
    <Nav.Link onClick={()=>navigate('/dashBoard')} >DashBoard</Nav.Link>
        <Nav.Link onClick={()=>navigate('/myPosts')}>My Posts</Nav.Link>
        <Nav.Link  onClick={()=>navigate('/profile')}>Profile</Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Container>
</Navbar>
  )
}

export default NavBar2