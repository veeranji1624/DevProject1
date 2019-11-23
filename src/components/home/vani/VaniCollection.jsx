import React from 'react'
import {
  Row,
  Col
} from 'reactstrap'
import icon1 from '../../../assets/img/Vani-inner-icon1.jpg'
import icon2 from '../../../assets/img/Vani-inner-icon2.jpg'
import icon4 from '../../../assets/img/Vani-inner-icon4.jpg'
import icon5 from '../../../assets/img/Vani-inner-icon5.jpg'
import icon6 from '../../../assets/img/Vani-inner-icon6.jpg'
import icon8 from '../../../assets/img/Vani-inner-icon8.jpg'


export default function VaniCollection() {
  window.scrollTo(0,0);
  return (
    <div>
      <div className="vani-bg1">
        <h4 className="bold dark-blue-text">
          Vani exists to simplify the current <br />
          Assessment / Examination model in <br />
          any domain
        </h4>
      </div>
      <div className="vani-block1">
        <h4 className="bold dark-blue-text pl-3">
          Vani
        </h4>
        <h6 className="p-3">
          <b>Vani is a provider of digital online Examinations and Assessment solutions.</b>
          Our customers trust our user-friendly yet advanced cloud based exams software to gather the information they need to make smart decisions. Whether you're a student, self-employed, work int the public or private sector we have features that willsuit your Assessment and analysis needs.
        </h6>
        <h6 className="p-3">
          Create customized exams from scratch, then distribute your own contact list or sell it in the public customer pool. Results are created in real time so you can create reports, share analytics and learn from your participants instantly.
        </h6>
        <h6 className="p-3">
          Vani exists to simplify the online Examination / Assessment process for educational / coaching institutions, Govt. and psu's, Corporate recruitment, appraisals and training.
        </h6>
      </div>
      <div className="vani-bg2">
        <Row>
          <Col md="6">
            <h4 className="dark-blue-text bold">Highlights</h4>
            <div className="text-block">
              <h5 className="dark-blue-text">Easy to use, powerful, Secure Online Examination Tool</h5>
              <p>Vani is a provider of digital online Examination, Assessment solutions, Create, Share, Sell and Analyze online exams</p>
            </div>
            <div className="text-block">
              <h5 className="dark-blue-text">Scalable, Secure and Customizable cloud solution</h5>
              <p>Question bank management supports many types of question formats, tested for millions of parallel users, secured with enterprise standards</p>
            </div>
            <div className="text-block">
              <h5 className="dark-blue-text">Solution for Educational Institutions, Govt and Enterprises</h5>
              <p>Easy-to-use, customizable, online assessment saving hours of paperwork for any domain</p>
            </div>
            <div className="text-block">
              <h5 className="dark-blue-text">Support Surveys, Audits and Live Q&A</h5>
              <p>Customizable surveys and audits for any domain. Conduct live Q&A during live events and meetings in an effective way</p>
            </div>
          </Col>
        </Row>
      </div>        
      <div className="vani-block2">
        <Row>
          <Col md="6">
            <h4 className="dark-blue-text bold">Features</h4>
          </Col>
          <Col md="6"></Col>
          <Col md="4">
            <div className="center">
              <img src={icon1} alt="Consulting" />
              <h6 className="dark-blue-text bold center">Question Bank Management</h6>
            </div>
            <h6 className="center">
              User friendly question bank supporting eight types of questions as per needs
            </h6>
          </Col>
          <Col md="4">
            <div className="center">
              <img src={icon2} alt="Consulting" />
              <h6 className="dark-blue-text bold center">Role Based Examination Manager</h6>
            </div>
            <h6 className="center">
              Varied user role provisions to create and share Exams, Reports and Administration
            </h6>
          </Col>
          <Col md="4">
            <div className="center">
              <img src={icon4} alt="Consulting" />
              <h6 className="dark-blue-text bold center">Access Through Digital Gadgets</h6>
            </div>
            <h6 className="center">
              Compatible with all types of devices and standard internet browsers
            </h6>
          </Col>
          <Col md="4">
            <div className="center">
              <img src={icon5} alt="Consulting" />
              <h6 className="dark-blue-text bold center">API's to 3<sup>rd</sup> Party Integrations</h6>
            </div>
            <h6 className="center">
              Web services support to integrate with third party systems
            </h6>
          </Col>
          <Col md="4">
            <div className="center">
              <img src={icon6} alt="Consulting" />
              <h6 className="dark-blue-text bold center">Scalable System for Millions</h6>
            </div>
            <h6 className="center">
              Use of latest technologies to scale upto millions of parallel users
            </h6>
          </Col>
          <Col md="4">
            <div className="center">
              <img src={icon8} alt="Consulting" />
              <h6 className="dark-blue-text bold center">Reports & Analytics</h6>
            </div>
            <h6 className="center">
              Various reporting options each with visual representations
            </h6>
          </Col>
        </Row>
        <div className="center">
          <a href="http://www.vani.xyz" target="_blank" rel="noopener noreferrer" className="vani-button">Know More</a>
        </div>
      </div>
    </div>
  )
}
