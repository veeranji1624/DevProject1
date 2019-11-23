import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Container,
  Row,
  Col,
  Form  
} from 'reactstrap'
import { addInquiry } from '../../../../../redux/actions/inquiryActions'
import FormComponent from '../../../../common/FormComponent'
import { Validator, submitValidator, errors } from '../../../../common/Validator';
import Notifier from '../../../../aside/Notifier'
import ErrorNotifier from '../../../../aside/ErrorNotifier'

class AddInquiry extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      email: '',
      contact: '',
      org: '',
      subject:'',
      remarks: '',
      message: '',
      error: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e){
    Validator(e.target);
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  onSubmit(e){
    e.preventDefault();
    submitValidator(e.target);
    const data = {
      empId: localStorage.getItem('id'),
      contactName: this.state.name,
      emailId: this.state.email,
      contactNo: this.state.contact,
      orgName: this.state.org,
      subjectDesc: this.state.subject,
      messageDesc: this.state.remarks
    }

    if(errors.valid){
      this.props.addInquiry(data, this.props.history);
    }else{
      this.setState({
        error: 'Fill mandatory fields'
      })
      setTimeout(() => {
        this.setState({
          message: '',
          error: ''
        })
      }, 5000)
    }
  }
  render() {
    let shrink = this.props.sidebar ?'scale' :'no-scale';
    return (
      <div className={shrink}>
        <Container className="card container-card">
          <Link to="/employee/inquiries">
            <i
              className="material-icons pointer"
              style={{position:'absolute', top: '5px', right: '5px', color: '#C00'}}
            >cancel</i>
          </Link>
          <h5 className="bold center pt-3">Add Inquiry</h5>
          <Form onSubmit={this.onSubmit} className="p-3" noValidate>
            <Row>
              <Col md="2"></Col>
              <Col md="8">
                <FormComponent
                  labelClass="label-sm bold"
                  label="Name"
                  name="name"
                  type="text"
                  value={this.state.name}
                  change={this.onChange}                    
                  required={true}
                />
                <FormComponent
                  labelClass="label-sm bold"
                  label="Email"
                  name="email"
                  type="email"
                  value={this.state.email}
                  change={this.onChange}                    
                  required={true}
                />
                <FormComponent
                  labelClass="label-sm bold"
                  label="Contact No."
                  name="contact"
                  type="number"
                  value={this.state.contact}
                  change={this.onChange}                    
                  required={true}
                />
                <FormComponent
                  labelClass="label-sm bold"
                  label="Organization"
                  name="org"
                  type="text"
                  value={this.state.org}
                  change={this.onChange}                                      
                />
                <FormComponent
                  labelClass="label-sm bold"
                  label="Subject"
                  name="subject"
                  type="text"
                  value={this.state.subject}
                  change={this.onChange}                    
                  required={true}
                />
                <FormComponent
                  labelClass="label-sm bold"
                  label="Message"
                  name="remarks"
                  type="text"
                  value={this.state.remarks}
                  change={this.onChange}                    
                  required={true}
                />
                <div className="center">
                  <button className="btn login-button white-text">Add Inquiry</button>
                </div>
              </Col>
            </Row>
          </Form>
          {this.state.message? <Notifier message={this.state.message} /> :null}
          {this.state.error? <ErrorNotifier message={this.state.error} /> :null}
        </Container>
      </div>
    );
  }
}

AddInquiry.propTypes = {
  addInquiry: PropTypes.func.isRequired
}

export default connect(
  null,
  { addInquiry }
)(AddInquiry);
