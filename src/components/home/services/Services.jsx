import React from "react"
import {
  Row,
  Col,
} from "reactstrap"
import icon1 from '../../../assets/img/service-icon1.png'
import icon2 from '../../../assets/img/service-icon2.png'
import icon3 from '../../../assets/img/service-icon3.png'
import icon4 from '../../../assets/img/service-icon4.png'
 
export default () => {
  return (
    <div id="services">
      <div className="left section-header pl-3  ">
        <h4 className="dark-blue-text bold service-header">SERVICES</h4>
      </div>
      <Row>
        <Col md="8">
          <Row>
            <Col md="6">
              <div className="differ">
                <div className="icon-container center">
                  <img src={icon1} alt="Consulting" className="service-img" />
                </div>
                <h5 className="dark-blue-text bold center">Consulting</h5>
                <p className="center service-text">
                  Comprehensive business and technology driven consulting services in the areas of AI, Cloud, Digital, DevOps, Enterprise Service Automation, and Quality Engineering
                </p>
              </div>         
            </Col>
            <Col md="6">
              <div className="differ">
                <div className="center icon-container">
                  <img src={icon2} alt="Consulting" className="service-img" />
                </div>
                <h5 className="dark-blue-text bold center">Digital Solutions</h5>
                <p className="center service-text">
                  We help enable your digital vision by developing and testing Applications in digital platforms by leveraging lightweight, modern, API-led, Micro-Services based technology architectures
                </p>               
              </div> 
            </Col>
            <Col md="6">
              <div className="differ">
                <div className="center icon-container">
                  <img src={icon3} alt="Consulting" className="service-img" />                      
                </div>
                <h5 className="dark-blue-text bold center">IT Products</h5>
                <h6 className="center service-text">
                  We deliver next-gen digital software offerings with flexible consumption models, bringing innovation & agility to create value and transformation for our customer's business.
                </h6>
              </div>
            </Col>
            <Col md="6">
              <div className="differ">
                <div className="center icon-container">
                  <img src={icon4} alt="Consulting" className="service-img" />                  
                </div>
                <h5 className="dark-blue-text bold center">Professional Services</h5>
                <h6 className="center service-text">
                  We provide high end professional services for niche areas such as Enterprise Service Automation and SaaS products in terms of assessments, solutioning and implementation.
                </h6>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
