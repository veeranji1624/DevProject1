import React from "react"
import {
  Row,
  Col
} from "reactstrap"
import img from '../../../assets/img/pic1.jpg'
 
const About = () => {
  return (
    <div id="about">
      <h4 className="dark-blue-text bold pb-4 pl-3">ABOUT US</h4>
      <h5 className="dark-blue-text center">Welcome To Pion Global Private Limited</h5>
      <Row>
        <Col md="7" className="about-text-container">
          <h5>
            Pion Global Private Limited is a Techno business consulting company driven by strataegic partnerships, inhouse innovations, efficient delivery teams and aggressive market penetration.
          </h5>
          <br />
          <h5>
            Our focus is to provide efficient and controlled technical and business solutions, with agility and faster time to market.
          </h5>
          <br />
          <h5>
            Our services focus around technology and business consulting, IT products development and implementation and professional services for SaaS solutions.
          </h5>
        </Col>
        <Col md="5" className="about-img-container">
          <img src={img} className="responive-img" alt="About us" />
        </Col>
      </Row>
    </div>
  );
};
export default About;