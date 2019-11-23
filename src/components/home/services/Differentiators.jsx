import React from "react";
import { Link } from 'react-router-dom'
import {
  Row,
  Col
} from "reactstrap";
import img1 from '../../../assets/img/product-Overview-icon1.png'
import img2 from '../../../assets/img/product-Overview-icon2.png'
import img3 from '../../../assets/img/product-Overview-icon3.png'
import img4 from '../../../assets/img/product-Overview-icon4.png'
 
export default () => {
  return (
    <div id="differentiators">
      <Row>
        <Col md="5">
          <div className="left section-header">
            <h4 className="dark-blue-text bold service-header">PRODUCTS</h4>
          </div>
        </Col>
        <Col md="7">
          <Row>
          <Col md="6">
              <div className="differ">
                <div className="icon-container center">
                  <img src={img4} alt="Inteli Hire Icon" />
                </div>
                <h5 className="bold center dark-blue-text">SMART HIRE</h5>
                <h6 className="justify">
                  Accelerate and Optimize your hiring solutions by levereging Digital Technology & Artificial Inteligence
                </h6>
                <div className="center">
                  <a href="http://www.growthgamut.com" rel="noopener noreferrer" target="_blank" className="blue-text differ-button">Know More &gt;&gt;</a>
                </div>
              </div>
            </Col>
            <Col md="6">
              <div className="differ">
                <div className="icon-container center">
                  <img src={img1} alt="Smart IT Icon" />
                </div>
                <h5 className="dark-blue-text bold center">SMART IT</h5>
                <h6 className="justify">
                  Ideation using design thinking to drive solutions from boardroom to implementation. 
                </h6>
                <div className="center">
                  <a href={null} className="dark-blue-text differ-button">Know More &gt;&gt;</a>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <div className="differ">
                <div className="icon-container center">
                  <img src={img2} alt="Smart Test Icon" />
                </div>
                <h5 className="bold center dark-blue-text">SMART TEST</h5>
                <h6 className="justify">
                  Accelerated application releases leveraging digital test automation solutions for modern IT
                </h6>
                <div className="center">
                  <a href={null} className="dark-blue-text differ-button">Know More &gt;&gt;</a>
                </div>
              </div>
            </Col>
            <Col md="6">
              <div className="differ">
                <div className="icon-container center">
                  <img src={img3} alt="Vani Icon" />
                </div>
                <h5 className="bold center dark-blue-text">SMART ASSESS</h5>
                <h6 className="justify">
                  Innovative digital assessment solution for Exams, Surveys and Evaluations with greater efficiency.
                </h6>
                <div className="center">
                  <Link to="vani" className="dark-blue-text differ-button">Know More &gt;&gt;</Link>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};