import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap'
import { updateLead } from '../../../../redux/actions/leadsActions'
import { Validator, errors, submitValidator } from '../../../common/Validator';
import FormComponent from '../../../common/FormComponent';
import Notifier from '../../../aside/Notifier'
import ErrorNotifier from '../../../aside/ErrorNotifier'

class UpdateForm extends Component {
  constructor(props){
    super(props);
    const {
      leadId,
      contactName,
      emailId,
      contactNo,
      organizationName,
      currentDesignation,
      subjectDesc,
      messageDesc,
      leadStatus,
      leadType,
      assignedTo,
      leadRemarks
    } = props.item;
    
    this.state = {
      id: leadId,
      name: contactName,
      email: emailId,
      contact: contactNo,
      org: organizationName,
      designation: currentDesignation,
      subject: subjectDesc,
      msg: messageDesc,
      status: leadStatus,
      type: leadType,
      assignedTo: assignedTo,
      remarks: leadRemarks,
      message: null,
      error: null
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);    
  }
  componentDidUpdate(){
    if(this.props.sales.message){
      setTimeout(() => {
        this.props.back();
      }, 2000)
    }
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
      leadId: this.state.id,                  
      organizationName: this.state.org,
      currentDesignation: this.state.designation,
      subjectDesc: this.state.subject,
      messageDesc: this.state.msg,
      leadStatus: this.state.status,
      leadType: this.state.type,
      assignedTo: this.state.assignedTo,
      leadRemarks: this.state.remarks,
      updatedBy: localStorage.getItem('id')
    }
    if(errors.valid){
      this.props.updateLead(data, this.props.history);
    }
  }
  render() {    
    let shrink;
    this.props.sidebar?shrink="scale":shrink="no-scale";
    return (
      <div className={shrink}>
        <Container className="card container-card">
          <i
            className="material-icons pointer"
            style={{position:'absolute', top: '5px', right: '5px', color: '#C00'}}
            onClick={this.props.back}>cancel</i>
          <h4 className="center bold p-2">Update Lead</h4>
          <Form onSubmit={this.onSubmit} className="p-3" noValidate>
            <Row>
              <Col md="6">
                <FormComponent
                  labelClass="bold label-sm"
                  label="Contact Name"
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
                />                
                <FormComponent
                  labelClass="bold label-sm"
                  label="Contact Number"
                  type="number"
                  name="contact"
                  value={this.state.contact}
                  change={this.onChange}
                />
                <FormComponent
                  labelClass="bold label-sm"
                  label="Organization"
                  type="text"
                  name="org"
                  value={this.state.org}
                  change={this.onChange}
                  required={true}
                />
                <FormComponent
                  labelClass="bold label-sm"
                  label="Contact Designation"
                  type="text"
                  name="designation"
                  value={this.state.designation}              
                  change={this.onChange}
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
              </Col>
              <Col md="6">
                <FormComponent
                  labelClass="bold label-sm"
                  label="Message"                  
                  type="text"
                  name="msg"
                  value={this.state.msg}                  
                  change={this.onChange}
                  required={true}
                />                
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
                  label="AssignedTo"
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
            <div className="center">
              <button className="btn center login-button white-text">Update</button>
            </div>
          </Form>
        </Container>
        {this.props.leads.message? <Notifier message={this.props.leads.message} />: null}
        {this.state.error? <ErrorNotifier message={this.state.error} />: null}
      </div>
    )
  }
}

UpdateForm.propTypes = {
  leads: PropTypes.object.isRequired,
  updateLead: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  leads: state.leads
})

export default connect(
  mapStateToProps,
  { updateLead }
)(UpdateForm);