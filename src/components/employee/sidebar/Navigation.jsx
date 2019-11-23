import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  NavbarBrand
} from 'reactstrap'
import logo from '../../../assets/img/pionlogo(edit).png'
import AccountBox from '../../aside/AccountBox'

class Navigation extends Component {
  constructor(){
    super();
    this.state = {
      click: false
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(){
    this.setState({
      click: !this.state.click
    })
  }
  render() {
    const user = localStorage.getItem('username');
    return (
      <div>
        <Navbar color="light" light fixed="top" expand="md" id="navigation">
          <div className="sidebar-toggle-container">
            <i
              className="material-icons white-text sidebar-icon pointer"
              onClick={ this.props.toggle }
            >
              menu
            </i>
          </div>
          <Link to="/" className="ml-5">
            <NavbarBrand>
              <img
                src={logo}                
                height="40"
                style={{ margin: 0 }}
                alt="PION global"
                id="logo"
              />
            </NavbarBrand>
        </Link>
          <Nav navbar className="ml-auto pr-2">
            <NavItem>
              <NavLink onMouseEnter={this.handleClick} style={{color: '#04044C'}}>
                {user}
              </NavLink>
            </NavItem>
            <NavItem className="hidden-item">
              <NavLink style={{color: '#04044C'}}>
                Connected Sites
              </NavLink>
            </NavItem>
              <h6 className="mt-2 mr-2">{this.state.click?<AccountBox click={this.handleClick} name={user} />:null}</h6>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

Navigation.propTypes = {
  toggle: PropTypes.func.isRequired
}
export default Navigation;
