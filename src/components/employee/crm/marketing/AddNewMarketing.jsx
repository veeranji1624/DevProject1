import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input  
} from 'reactstrap'
import {
  Validator,
  errors,
  submitValidator
} from '../../../common/Validator'
import { addLead } from '../../../../redux/actions/leadsActions'
import FormComponent from '../../../common/FormComponent'
import Notifier from '../../../aside/Notifier'
import ErrorNotifier from '../../../aside/ErrorNotifier'

class AddNewForm extends Component {
  constructor(){
    super();
    this.state = {
      name: '',
      email: '',
      contact: '',
      org: '',
      designation: '',
      subject: '',
      msg: '',
      status: 'New',
      type: 'Warm',
      assignedTo: '',
      remarks: '',      
      message: null,
      error: null
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);    
  }
  onChange(e){
    e.preventDefault();
    Validator(e.target);
    this.setState({
      [e.target.name]: e.target.value
    })
  }      
  onSubmit(e){
    e.preventDefault();
    submitValidator(e.target);
    const data = {
      contactName: this.state.name,
      emailId: this.state.email,
      contactNo: this.state.contact,
      organizationName: this.state.org,
      currentDesignation: this.state.designation,
      subjectDesc: this.state.subject,
      messageDesc: this.state.msg,
      leadStatus: this.state.status,
      leadType: this.state.type,
      assignedTo:this.state.assignedTo,
      leadRemarks: this.state.remarks
    }
    if(errors.valid){
      this.props.addLead(data, this.props.history);
    } else {
      this.setState({
        error: 'Please enter the proper details and try again'
      })
      setTimeout(() => {
        this.setState({          
          error: null
        })
      }, 5000)
    }
  }
  render() {
    let shrink;
    this.props.sidebar?shrink="scale":shrink="no-scale";    
    return (
      <div className={shrink}>
        <Container className="card container-card">
          <Link to="/employee/marketing">
            <i className="material-icons pointer cancel-button">cancel</i>
          </Link>
          <h5 className="center bold p-3">New Lead</h5>
          <Form onSubmit={this.onSubmit} className="p-3" noValidate>
            <Row>
              <Col md="4">
                <FormComponent
                  labelClass="bold label-sm"
                  label="Contact name"
                  type="text"
                  name="name"
                  value={this.state.name}                    
                  change={this.onChange}
                  required={true}
                />
                <FormComponent
                  labelClass="bold label-sm"
                  label="Contact Email Id"
                  type="email"
                  name="email"
                  value={this.state.email}              
                  change={this.onChange}
                  required={true}
                />
                <FormComponent
                  labelClass="bold label-sm"
                  label="Contact No"                  
                  type="number"
                  name="contact"
                  value={this.state.contact}              
                  change={this.onChange}
                  required={true}
                />
                <FormComponent
                  labelClass="bold label-sm"
                  label="Name of Organization"                  
                  type="text"
                  name="org"
                  value={this.state.org}              
                  change={this.onChange}
                  required={true}
                />
              </Col>
              <Col>            
                <FormComponent
                  labelClass="bold label-sm"
                  label="Current Designation"
                  type="text"
                  name="designation"
                  value={this.state.designation}              
                  change={this.onChange}
                  required={true}
                />
                <FormComponent
                  labelClass="bold label-sm"
                  label="Subject"                  
                  type="text"
                  name="subject"
                  value={this.state.subject}              
                  change={this.onChange}
                  required={true}
                />
                <FormComponent
                  labelClass="bold label-sm"
                  label="Message"                  
                  type="text"
                  name="msg"
                  value={this.state.msg}              
                  change={this.onChange}
                  required={true}
                />
              </Col>
              <Col>              
                <FormGroup>
                  <Label className="bold label-sm">Lead Status</Label>
                  <Input
                    type="select"
                    name="status"
                    value={this.state.status}
                    className="form-control-sm"
                    onChange={this.onChange}                    
                  >
                    <option value="New">New</option>
                    <option value="WIP">Work in progress</option>
                    <option value="Closed">Closed</option>
                    <option value="Opportunity">Opportunity</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label className="bold label-sm">Lead Type</Label>
                  <Input
                    type="select"
                    name="type"
                    value={this.state.type}
                    className="form-control-sm"
                    onChange={this.onChange}                    
                  >
                    <option value="Warm">Warm</option>
                    <option value="Hot">Hot</option>
                    <option value="Cold">Cold</option>                    
                  </Input>
                </FormGroup>
                <FormComponent
                  labelClass="bold label-sm"
                  label="Assigned To"                  
                  type="text"
                  name="assignedTo"
                  value={this.state.assignedTo}              
                  change={this.onChange}
                  required={true}
                />
                <FormComponent
                  labelClass="bold label-sm"
                  label="Remarks"                  
                  type="text"
                  name="remarks"
                  value={this.state.remarks}              
                  change={this.onChange}
                  required={true}
                />
              </Col>              
            </Row>
            <div class="center">
              <button className="btn center login-button white-text">Add</button>
            </div>
          </Form>
        </Container>
        {this.state.message? <Notifier message={this.state.message} />: null}
        {this.state.error? <ErrorNotifier message={this.state.error} />: null}
      </div>
    )
  }
}

AddNewForm.propTypes = {
  addLead: PropTypes.func.isRequired
}

export default connect(
  null,
  { addLead }
)(AddNewForm);