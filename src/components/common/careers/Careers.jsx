import React, { Component } from 'react'
import {
  Row,
  Col,
  Card
} from 'reactstrap'
import CareerItem from './CareerItem'
 
class Careers extends Component {
  constructor(){
    super();
    this.state = {
      selection: null
    }
    this.close = this.close.bind(this);
  }
  close(){
    this.setState({
      selection: null
    })
  }
  render() {
    return (
      <div id="careers">
        <div className="left section-header">
          <h4 className="dark-blue-text bold service-header pl-3">CAREERS</h4>
        </div>
        <Row className="p-5 career-item-row">
          {!this.state.selection
            ?(<Row>
              <h5 className="center dark-blue-text col-md-12">
                Current Openings
              </h5>
              <Col md="3">
                <Card 
                  className="career-card technical pointer"
                  onClick={ () => this.setState({ selection: 'Technology' })}>
                  <div className="overlay">
                    <h4 className="center m-4">Technology</h4>
                    <br />
                    <p className="center">
                      Click to view all jobs
                    </p>
                  </div>
                </Card>
              </Col>
              <Col md="3">
                <Card className="career-card bpo pointer" onClick={() => this.setState({selection: 'Consulting'})}>
                  <div className="overlay">
                    <h4 className="center m-4">Consulting</h4>
                    <br />
                    <p className="center">Click to view all jobs</p>
                  </div>
                </Card>
              </Col>
              <Col md="3">
                <Card className="career-card sales pointer" onClick={()=>this.setState({selection: 'Sales'})}>
                  <div className="overlay">
                    <h4 className="center m-4">Sales</h4>
                    <br />
                    <p className="center">Click to view all jobs</p>
                  </div>
                </Card>
              </Col>
              <Col md="3">
                <Card className="career-card marketing pointer" onClick={()=>this.setState({selection: 'Support'})}>
                  <div className="overlay">
                    <h4 className="center m-4">Support</h4>
                    <br />
                    <p className="center">Click to view all jobs</p>
                  </div>
                </Card>
              </Col>
            </Row>)
            :<Col md="12" className="center">
              <CareerItem domain={this.state.selection} back={this.close} />
            </Col>}
        </Row>
        <h6 className="center mb-5">
          Found a suitable job profile? View details and apply.<br />
          We will get back at you within two days.
        </h6>
      </div>
    )
  }
}
export default Careers;