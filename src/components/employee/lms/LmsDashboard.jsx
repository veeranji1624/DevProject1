import React, { Component } from 'react'
import {
  Container,
  Card,
  Row,
  Col
} from 'reactstrap'
import CompanyHolidays from './CompanyHolidays'
import ApplyLeave from './ApplyLeave'
import PendingLeave from './PendingLeave'
import LeaveBalance from './LeaveBalance'

class LmsDashboard extends Component {
  constructor(){
    super();
    this.state = {
      edit: ''
    }
    this.back = this.back.bind(this);
    this.chooseForm = this.chooseForm.bind(this);
  }
  back(){
    this.setState({
      edit: ''
    })
  }
  chooseForm(){
    let component = this.state.edit;
    if (component === 'holiday'){
      return <CompanyHolidays />
    }
    if (component === 'apply'){
      return <ApplyLeave />
    }
    if (component === 'pending'){
      return <PendingLeave />
    }
    if (component === 'balance'){
      return <LeaveBalance />
    }
  }
  render() {
    let shrink;
    this.props.sidebar? shrink = 'scale': shrink =  'no-scale';
    return (
      <div className={shrink}>
        {!this.state.edit && <h5 className="bold center">Leave Management System</h5>}
        <Container className="container-card p-2" style={{position:'relative'}}>
          {this.state.edit
            ?<i
              className="material-icons cancel-button pointer"
              onClick={this.back}
            >cancel
            </i>
            :null}
         {!this.state.edit?
         <Row>
           <Col md="6">
            <Card
              className="center profile-edit-card"
              onClick={() => this.setState({edit: 'holiday'})}
            >
              <i className="material-icons">event_available</i>
              <h6 className="bold">Company Holidays</h6>
            </Card>
           </Col>
           <Col md="6">
            <Card
              className="center profile-edit-card"
              onClick={() => this.setState({edit: 'apply'})}
            >
              <i className="material-icons">add_circle</i>
              <h6 className="bold">Submit Leave Application</h6>
            </Card>
           </Col>
           <Col md="6">
            <Card
              className="center profile-edit-card"
              onClick={() => this.setState({edit: 'pending'})}
            >
              <i className="material-icons">list</i>
              <h6 className="bold">Pending Requests</h6>
            </Card>
           </Col>
           <Col md="6">
            <Card
              className="center profile-edit-card"
              onClick={() => this.setState({edit: 'balance'})}
            >
              <i className="material-icons">assignment_late</i>
              <h6 className="bold">Leave Balance</h6>
            </Card>
           </Col>
         </Row>
         :this.chooseForm()}
        </Container>
      </div>
    )
  }
}
export default LmsDashboard;