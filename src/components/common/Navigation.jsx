import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  Navbar,
  NavbarBrand,
  NavbarToggler, 
  Nav,
  Container,
  Collapse,
  NavItem,
  NavLink
} from 'reactstrap';
import brochure from '../../assets/files/PionGlobalBrochure.pdf'
import pion from '../../assets/img/pionlogo(edit).png'

class Navigation extends Component {
  constructor(){
    super();
    this.state={
      isOpen: false
    }
    this.toggle = this.toggle.bind(this);
  }
  toggle(){
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  render() {
    const userName = localStorage.getItem('username');
    return (
      <Navbar color="light" light fixed="top" expand="md" id="navigation">
      <Container>
        <NavbarBrand>
        <a href="#home">
        <img
          src={pion}
          height="40"
          style={{margin: 0}}
          alt="PION global"
          id="logo"
        />
        </a>
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="mr-auto nav-left" navbar>
            <NavItem className="navs">
              <NavLink href="#about">
                About us
              </NavLink>
            </NavItem>
            <NavItem className="navs">
              <NavLink href="#differentiators">
                Products
              </NavLink>
            </NavItem>
            <NavItem className="navs">
              <NavLink href="#services">
                Services
              </NavLink>
            </NavItem>
            <NavItem className="navs">
              <NavLink href="#partners">
                Partners
              </NavLink>
            </NavItem>
            <NavItem className="navs">
              <NavLink href="#careers">
                Careers
              </NavLink>
            </NavItem>
            <NavItem className="navs">
              <NavLink href="#contact">
                Contact us
              </NavLink>
            </NavItem>
          </Nav>
          <Nav navbar className="nav-right">
            <NavItem>
              {!userName
              ?<Link
                className="nav-route"
                style={{ textDecoration: 'none' }}
                to="/login"
              >
                <NavLink style={{color: '#04044C'}}>
                  Login
                </NavLink>
              </Link>
              :<Link
                className="nav-route"
                style={{ textDecoration: 'none' }}
                to="/employee"
              >
                <NavLink style={{ color: '#0756AC' }}>
                  {userName}
                </NavLink>
               </Link>
              }
            </NavItem>
            <NavItem>
              <NavLink
                href={ brochure }
                target="_blank"
              >
                Brochure
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
    );
  }
}
export default Navigation;