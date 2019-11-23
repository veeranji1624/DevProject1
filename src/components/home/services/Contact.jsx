import React, { Component } from "react";
import axios from 'axios';
import {  
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from "reactstrap";
import { CONTACT_US } from '../../../utils/routes'
import {
  FormValidator,
  emailChecker,
  textChecker,
  numChecker
} from '../../common/FormValidator'
import Notifier from '../../aside/Notifier'
import ErrorNotifier from '../../aside/ErrorNotifier'

 
class Contact extends Component{
  constructor(){
    super();
    this.state = {
      name: '',
      email: '',
      phone: '',
      org: '',
      subject: '',
      content: '',
      formErrors: {
        name: '',
        email: '',
        phone: '',
        org: '',
        subject: '',
        content: ''
      },
      message: null,
      error: null
    }
    this.clearState = this.clearState.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount(){
    let input = document.getElementById('validate');
    input.oninvalid = function(e){
      e.target.setCustomValidity('Use Alphabets, Numbers or Spaces');
    }
  }
  clearState(){
    this.setState({
      name: '',
      email: '',
      phone: '',
      org: '',
      subject: '',
      content: '',
      message: null,
      error: null
    })
  }
  onChange(e){
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    })    
  }
  onBlur(e){
    const { name, value } = e.target;
    let errors = this.state.formErrors;

    switch(name){
      case 'name':
        errors.name = textChecker.test(value) ? '': 'Use only alphabets, numbers and spaces';
        break;
      case 'email':
        errors.email = emailChecker.test(value) ? '': 'Please enter a proper email id';
        break;
      case 'phone':
        errors.phone = numChecker.test(value) ? '': 'Please enter a proper number';
        break;
      case 'org':
        errors.org = textChecker.test(value) ? '': 'Use only alphabets, numbers and spaces';
        break;
      case 'subject':
        errors.subject = textChecker.test(value) ? '': 'Use only alphabets, numbers and spaces';
        break;
      case 'content':
        errors.content = textChecker.test(value) ? '': 'Use only alphabets, numbers and spaces';
        break;
      default:
        break;
    }
    this.setState({
      formErrors:errors      
    })
  }
  onSubmit(e){
    e.preventDefault();
    if(FormValidator(this.state)){
      let mail = {
        contactName: this.state.name,  
        emailId: this.state.email,
        contactNo: this.state.phone,
        orgName: this.state.org,
        subjectDesc: this.state.subject,
        messageDesc: this.state.content
      }
      console.log(mail);
      axios.post(
        CONTACT_US,
        mail,
        {withCredentials: true}
        )
        .then(res => {        
          this.setState({
            message: 'Message sent successfully'
          })
          setInterval(() => {
            this.setState({
              message: null            
            })
          }, 5000)
        })
        .catch(err => {
          this.setState({
            error: 'Message could not be delivered. Please try again later.'
          })
          setInterval(() => {
            this.setState({              
              error: null
            })
          }, 5000)
        })
      }else{
        this.setState({
          error: 'Please provide the required details'
        })
        setInterval(() => {
          this.setState({            
            error: null
          })
        }, 5000)
      }
  }
  render(){
    const { name, email, phone, org, subject, content } = this.state.formErrors;
    return (
      <div id="contact">
        <div>
          <h4 className="dark-blue-text bold pl-3">CONTACT US</h4>
          <h5 className="dark-blue-text center">Email: info@pionglobal.com</h5>
          <h6 className="center amaranth">
            Phone: +91-80-25742301
          </h6>
          <h6 className="center amaranth">
            Mobile: +91-9845696049 <br /><span className="right">+91-8884922248</span>
          </h6>
          <div className="contact-block pl-3">
            <div className="contact-item">
                <iframe
                  className="map-item"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.4362599803117!2d77.62047491439131!3d12.87964542037517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae14cce79ec07b%3A0x51845ba635101ede!2sPION+Global!5e0!3m2!1sen!2sin!4v1536298631805"
                  style={{ border: 0, height: '100%'}}
                  frameBorder="0"
                  title="location"
                  allowFullScreen
                />
              </div>
              <div className="contact-form">
                <h6 className="center contact-form-header">Please provide the following info to help us to serve you better.</h6>
                <Form onSubmit={this.onSubmit} className="pr-3 mb-3">
                  <div className="form-block">
                    <FormGroup className="row">
                      <Label className="col-md-3">Full name *</Label>
                      <span className="col-md-1 colon">:</span>
                      <Input
                        type="text"
                        className={`contact-input col-md-8 ${name && 'is-invalid'}`}
                        name="name"
                        id="validate"                        
                        onChange={this.onChange}
                        onBlur={this.onBlur}
                        value={this.state.name}                        
                      />
                      <span className="col-md-4"></span><FormText className="error">{name}</FormText>
                    </FormGroup>
                    <FormGroup className="row">
                      <Label className="col-md-3">Email *</Label>
                      <span className="col-md-1 colon">:</span>
                      <Input
                        type="email"
                        className={`contact-input col-md-8 ${email && 'is-invalid'}`}
                        name="email"
                        onChange={this.onChange}
                        onBlur={this.onBlur}
                        value={this.state.email}
                      />
                      <span className="col-md-4"></span><FormText className="error">{email}</FormText>
                    </FormGroup>
                    <FormGroup className="row">
                      <Label className="col-md-3">Contact *</Label>
                      <span className="col-md-1 colon">:</span>
                      <Input
                        type="number"
                        className={`contact-input col-md-8 ${phone && 'is-invalid'}`}
                        name="phone"
                        onChange={this.onChange}
                        onBlur={this.onBlur}
                        value={this.state.phone}
                        />
                      <span className="col-md-4"></span><FormText className="error">{phone}</FormText>
                    </FormGroup>
                    <FormGroup className="row">
                      <Label className="col-md-3">Organization</Label>
                      <span className="col-md-1 colon">:</span>
                      <Input
                        type="text"
                        className={`contact-input col-md-8 ${org && 'is-invalid'}`}
                        name="org"
                        id="validate"
                        onChange={this.onChange}
                        onBlur={this.onBlur}
                        value={this.state.org}
                      />
                      <span className="col-md-4"></span><FormText className="error">{org}</FormText>
                      </FormGroup>
                      <FormGroup className="row">
                        <Label className="col-md-3">Subject *</Label>
                        <span className="col-md-1 colon">:</span>
                        <Input
                          type="text"
                          className={`contact-input col-md-8 ${subject && 'is-invalid'}`}
                          name="subject"
                          id="validate"
                          onChange={this.onChange}
                          onBlur={this.onBlur}
                          value={this.state.subject}
                        />
                        <span className="col-md-4"></span><FormText className="error">{subject}</FormText>
                    </FormGroup>
                    <FormGroup className="row">
                      <Label className="col-md-3">Message *</Label>
                      <span className="col-md-1 colon">:</span>
                      <Input
                        type="text"
                        className={`contact-input col-md-8 ${content && 'is-invalid'}`}
                        name="content"
                        id="validate"
                        onChange={this.onChange}
                        onBlur={this.onBlur}
                        value={this.state.content}                        
                      />
                      <span className="col-md-4"></span><FormText className="error">{content}</FormText>
                    </FormGroup>
                  </div>
                  <Row>
                    <Col md="4"></Col>
                    <Col md="4" className="center">
                      <button type="submit" className="contact-button pointer">Send</button>
                    </Col>
                    <Col md="4" className="center">
                      <button type="button" onClick={this.clearState} className="contact-button pointer">Reset</button>
                    </Col>
                      {this.state.message?<Notifier message={this.state.message} />:null}
                      {this.state.error?<ErrorNotifier message={this.state.error} />:null}
                  </Row>
                </Form>
              </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Contact;