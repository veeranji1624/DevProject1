import React from 'react'
import { Link } from 'react-router-dom'
import {
  Navbar,
  NavbarBrand,
  Container
} from 'reactstrap';
import logo from '../../../assets/img/pionlogo(edit).png'

const LoginNavigation = () => {
    return (
      <Navbar color="dark" dark fixed="top" expand="md" id="navigation">
      <Container>
        <NavbarBrand>
          <Link to="/">
            <img
              src={logo}
              height="40"
              style={{margin: 0}}
              alt="PION global"
              id="logo"
            />
          </Link>
        </NavbarBrand>
      </Container>
    </Navbar>
    );
  }
export default LoginNavigation;