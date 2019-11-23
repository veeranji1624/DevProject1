import React from "react"
import { Link } from 'react-router-dom'
import {
  Row,
  Col
} from 'reactstrap'

const Footer = () => {
  return (
    <footer id="footer" className="flex">
      <Row>
        <Col md="3" className="left">
          <h6 className="bold">Pion Global Private Limited</h6>
          <small>B, 48, 4<sup>th</sup> Main Rd,</small><br />
          <small>Classic Paradise Layout, Begur,</small><br />
          <small>Bengaluru, Karnantaka, 560076</small>
        </Col>
        <Col md="6" className="center">
          <Link to="/privacy">
            <h6 style={{color: '#f0f0f0', display: 'inline'}}>Privacy </h6> |
          </Link>
          <Link to="/termsofuse">
            <h6 style={{color: '#f0f0f0', display: 'inline'}}> Terms of Use </h6> |
          </Link>
          <a href="#contact">
            <h6 style={{color: '#f0f0f0', display: 'inline'}}> Locations</h6>
          </a><br /><br />
          <h6>Copyright 2019 &copy;, Pion Global Pvt. Ltd.. All Rights Reserved.</h6>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;