import React, { Component } from 'react'
import {
  Container,
  Card,
  Row,
  Col
} from 'reactstrap'
import PersonalInformation from './PersonalInformation'
import ProfessionalDetails from './ProfessionalDetails'
import EducationDetails from './EducationDetails'
import Nomination from './Nomination'
import BankDetails from './BankDetails'
import PassportDetails from './PassportDetails'

class EditProfile extends Component {
  constructor(){
    super();
    this.state = {
      edit: ''
    }
    this.back = this.back.bind(this);
    this.chooseForm = this.chooseForm.bind(this);
  }
  back(){
    setTimeout(() => this.setState({
      edit: ''
    }), 200
    )
  }
  chooseForm(){
    let component = this.state.edit;
    if (component === 'personal'){
      return <PersonalInformation back={this.back} />
    }
    if (component === 'professional'){if (component === 'professional'){
      return <ProfessionalDetails back={this.back} />
    }
      return <ProfessionalDetails back={this.back} />
    }
    if (component === 'education'){
      return <EducationDetails back={this.back} />
    }
    if (component === 'nomination'){
      return <Nomination back={this.back} />
    }
    if (component === 'bank'){
      return <BankDetails back={this.back} />
    }
    if (component === 'passport'){
      return <PassportDetails back={this.back} />
    }
  }
  render() {
    let shrink;
    this.props.sidebar? shrink = 'scale': shrink =  'no-scale';
    return (
      <div className={shrink}>
        {!this.state.edit && <h5 className="bold center">Edit Profile</h5>}
        <Container className="container-card p-3" style={{position: 'relative'}}>
          {this.state.edit
            ?<i
              className="material-icons pointer"
              onClick={this.back}
              style={{color: '#C00', position: 'absolute', top: '5px', right: '5px'}}
            >cancel
            </i>
            :null}
         {!this.state.edit?
         <Row>
           <Col md="6">
            <Card
              className="center profile-edit-card"
              onClick={() => this.setState({edit: 'personal'})}
            >
              <i className="material-icons">person</i>
              <h6 className="bold">Personal Info</h6>
            </Card>
           </Col>
           <Col md="6">
            <Card
              className="center profile-edit-card"
              onClick={() => this.setState({edit: 'education'})}
            >
              <i className="material-icons">school</i>
              <h6 className="bold">Education</h6>
            </Card>
           </Col>
           <Col md="6">
            <Card
              className="center profile-edit-card"
              onClick={() => this.setState({edit: 'professional'})}
            >
              <i className="material-icons">work</i>
              <h6 className="bold">Professional Info</h6>
            </Card>
           </Col>
           <Col md="6">
            <Card
              className="center profile-edit-card"
              onClick={() => this.setState({edit: 'nomination'})}
            >
              <i className="material-icons">supervisor_account</i>
              <h6 className="bold">Nomination</h6>
            </Card>
           </Col>
           <Col md="6">
            <Card
              className="center profile-edit-card"
              onClick={() => this.setState({edit: 'bank'})}
            >
              <i className="material-icons">account_balance</i>
              <h6 className="bold">Bank Details</h6>
            </Card>
           </Col>
           <Col md="6">
            <Card
              className="center profile-edit-card"
              onClick={() => this.setState({edit: 'passport'})}
            >
              <i className="material-icons">assignment</i>
              <h6 className="bold">Passport Details</h6>
            </Card>
           </Col>
         </Row>
         :this.chooseForm()}
        </Container>
      </div>
    )
  }
}
export default EditProfile;