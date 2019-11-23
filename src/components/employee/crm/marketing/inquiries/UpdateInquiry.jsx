import React, { Component } from 'react';
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
import FormComponent from '../../../../common/FormComponent'
import { updateInquiry } from '../../../../../redux/actions/inquiryActions'
import { Validator, errors, submitValidator } from '../../../../common/Validator'
import Notifier from '../../../../aside/Notifier'
import ErrorNotifier from '../../../../aside/ErrorNotifier'

class UpdateInquiry extends Component {
  constructor(props){
    super(props);
    const { 
      contactName,
      emailId,
      orgName,
      subjectDesc,
      messageDesc,
      contactNo,      
      jobRole,      
      inqStatus,
      assignedTo,
      inqRemarks
    } = this.props.inquiry;
    this.state = {
      name: contactName,
      email: emailId,
      org: orgName,
      status: inqStatus,
      assignedTo: assignedTo,
      no: contactNo,
      job: jobRole,
      remarks: inqRemarks,    
      sub: subjectDesc,
      msg: messageDesc,
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
    if(errors.valid){
      const data = {
        inquiryId: this.props.inquiry.inquiryId,
        updatedBy: localStorage.getItem('id'),
        inqStatus: this.state.status,
        jobRole: this.state.job,
        contactNo: this.state.no,
        assignedTo: this.state.assignedTo,
        inqRemarks: this.state.remarks
      }
      this.props.updateInquiry(data, this.props.history);
    }
  }
  render() {
    return (
      <Container className="card container-card">
        <i
          className="material-icons pointer"
          style={{position:'absolute', top: '5px', right: '5px', color: '#C00'}}
          onClick={this.props.back}>cancel</i>
        <h5 className="bold center pt-3">Update Inquiry</h5>
        <Form onSubmit={this.onSubmit} className="p-3" noValidate>
          <Row>
            <Col md="2"></Col>
            <Col md="8">
              <FormGroup>
                <Label className="bold label-sm">Inquiry Status</Label>
                <Input
                  name="status"
                  type="select"
                  value={this.state.status}
                  onChange={this.onChange}
                  className="form-control-sm"
                >
                  <option value="New">New</option>
                  <option value="WIP">Work in progress</option>
                  <option value="Closed">Closed</option>
                  <option value="Lead">Lead</option>
                </Input>
              </FormGroup>
              <FormComponent
                labelClass="bold label-sm"
                label="Assigned To"
                name="assignedTo"
                type="text"
                value={this.state.assignedTo}
                change={this.onChange}
                required={true}
              />
              <FormComponent
                labelClassName="bold label-sm"
                label="Designation"
                name="job"
                type="text"
                value={this.state.job}
                change={this.onChange}
                required={true}
              />
              <FormComponent
                labelClass="bold label-sm"
                label="Contact No"
                name="no"
                type="number"
                value={this.state.no}
                change={this.onChange}
              />
              <FormComponent
                labelClass="bold label-sm"
                label="Remarks"
                name="remarks"
                type="text"
                value={this.state.remarks}
                change={this.onChange}
                required={true}
              />
              <div className="center">
                <button className="btn login-button white-text">Update Inquiry</button>
              </div>
            </Col>
          </Row>
        </Form>
        {this.props.inquiries.message? <Notifier message={this.props.inquiries.message} /> :null}
        {this.state.error? <ErrorNotifier message={this.state.error} /> :null}
      </Container>
    );
  }
}

UpdateInquiry.propTypes = {
  inquiries: PropTypes.object.isRequired,
  updateInquiry: PropTypes.func.isRequired  
}

const mapStateToProps = state => ({
  inquiries: state.inquiries
})

export default connect(
  mapStateToProps,
  { updateInquiry }
)(UpdateInquiry);