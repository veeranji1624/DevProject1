import React from 'react'
import { Link } from 'react-router-dom'
import { Container } from 'reactstrap'

const Privacy = () => {
  return(
    <div>
      <div className="blue pt-3">
        <h1 className="white-text center bold p-5">Sitemap</h1>
      </div>
      <Container className="p-5 blue-text" style={{ lineHeight: '30px', background: '#eee' }}>
        <ul>
          <li><Link to="/">Home</Link></li>
            <ul>
              <li>About Us</li>
              <li>Company History</li>
              <li>Our Mission</li>
              <li>Our Vision</li>
              <li>Our Core Values</li>
            </ul>
          <li>Products </li>
            <ul>
              <li>SMART IT Solution</li>
              <li>SMART TEST Platform</li>
              <li>VANI</li>
              <li>Inteli Hire Platform</li>
            </ul>
          <li>Services</li>
            <ul>
              <li>Technology Consulting</li>
              <li>Product Engineerings & Appliation Services</li>
              <li>Quality Engineering</li>
              <li>Servicenow solutions</li>
            </ul>
          <li>Careers</li>
            <ul>
              <li>Technical</li>
              <li>Consulting</li>
              <li>Sales</li>
              <li>Domain</li>
            </ul>
          <li>Contact Us</li>
          <li>Footer</li>
            <ul>
              <li>Whitepapers</li>
              <li>Blogs</li>
              <li>Locations</li>
              <li>Terms of Use</li>
              <li>Privacy</li>
              <li>Sitemap</li>
            </ul>
        </ul>
      </Container>
    </div>
  )
}
export default Privacy;