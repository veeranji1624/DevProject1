import React from "react";
import logo2 from '../../../assets/img/partner3.png'
import {
  Row,
  Col
} from "reactstrap";
 
export default () => {
  return (
    <div id="partners">
        <Row>
          <Col md="6">
            <div className="left section-header">
              <h4 className="dark-blue-text bold service-header">PARTNERS</h4>
            </div>
            <div className="partner-block">
              <div className="partner-logo-box">
                <img src={logo2} alt="Partner1" className="partner-logo" />
              </div>
              <h5 className="dark-blue-text bold">NeoLoad is Better at Load Testing than LoadRunner</h5>
              <ul>
                <li>Design loads tests 10x faster</li>
                <li>Reduce load test scripts maintenance by 90%</li>
                <li>Continuous integration within your DevOps toolchain   </li>
              </ul>
              <a href="https://www.neotys.com" rel="noopener noreferrer" target="_blank" className="differ-button">Know More &gt;&gt;</a>
            </div>
          </Col>
          <Col md="6">
          </Col>
        </Row>
    </div>
  );
};