import React, { Component } from "react"
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
} from "reactstrap";
import { addCompany } from '../../../redux/actions/customerAction'
import FormComponent from '../../common/FormComponent'
import { Validator, errors, submitValidator } from '../../common/Validator'
import Notifier from '../../aside/Notifier'
import ErrorNotifier from '../../aside/ErrorNotifier'

class AddCustomer extends Component {
  constructor() {
    super();
    this.state = {
      coName: '',
      address: '',
      fullName: '',
      email: '',
      contact: '',
      fileName: '',
      startDate: '',
      endDate: '',
      domain: 'IT',
      status: 'Active',
      remarks: '',      
      error: '',
      message: ''
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
    let customer = {
      compCreatorId: localStorage.getItem('id'),
      compFullName: this.state.coName,
      areasServed: this.state.domain,
      compPocFullName: this.state.fullName,
      compPocEmail: this.state.email,
      compPocMobileNumber: this.state.contact,
      compFullAddress: this.state.address,
      agrmntStartDate: this.state.startDate,
      agrmntEndDate: this.state.endDate,
      compCode: 3,      
      compRemarks: this.state.remarks,
      compActiveStatus: this.state.status
    }    
    if(errors.valid){      
      this.props.addCompany(customer, this.props.history);
    } else {
      this.setState({
        error: 'Fill the mandatory fields'
      })
      setTimeout(() => {
        this.setState({
          error: null
        }
      )}, 5000)
    }
  }
  render() {
    let shrink;
    this.props.sidebar? shrink = 'scale': shrink = 'no-scale';
    return (
      <div className={shrink}>
        <h5 className="center bold">Add Customer</h5>
          <Container className="card container-card">
            <Link to="/employee/customers">
            <i
              className="material-icons pointer"
              style={{position:'absolute', top: '5px', right: '5px', color: '#C00'}}
            >cancel</i>
          </Link>
            <Form onSubmit={ this.onSubmit } className="p-3 mt-2" noValidate>
              <Row>
                <Col md="4">
                  <FormComponent
                    labelClass="bold label-sm"
                    label="Name of the company"
                    type="text"
                    name="coName"                   
                    change={ this.onChange }
                    value={ this.state.coName }
                    placeholder="Full name of the company"
                    required={true}
                  />                  
                  <FormComponent
                    labelClass="bold label-sm"
                    label="Address of the company"                    
                    type="text"
                    name="address"                  
                    change={ this.onChange }
                    value={ this.state.address }
                    placeholder="Current address of the company"
                    required={true}
                  />                  
                  <FormComponent
                    labelClass="bold label-sm"
                    label="Point of Contact Full Name"                    
                    type="text"
                    name="fullName"                  
                    change={ this.onChange }
                    value={ this.state.fullName }
                    placeholder="Provide full name"
                    required={true}
                  />                  
                  <FormComponent
                    labelClass="bold label-sm"
                    label="Point of Contact E-mail ID"                    
                    type="email"
                    name="email"                  
                    change={ this.onChange }
                    value={ this.state.email }
                    placeholder="Valid email address"
                    required={true}
                  />                  
                </Col>
                <Col md="4">
                  <FormComponent
                    labelClass="bold label-sm"
                    label="Point of Contact Phone Number"                    
                    type="number"
                    name="contact"                  
                    change={ this.onChange }
                    value={ this.state.contact }
                    placeholder="Valid contact number"
                    required={true}
                  />                  
                  <FormGroup>
                    <Label className="bold label-sm">Comany Status</Label>
                    <Input
                      type="select"
                      name="status"
                      className="form-control-sm"
                      value={ this.state.status }
                      onChange={ this.onChange }
                      required
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </Input>
                  </FormGroup>
                  <FormComponent
                    labelClass="bold label-sm"
                    label="Agreement Start Date"                    
                    type="date"
                    name="startDate"                  
                    change={ this.onChange }
                    value={ this.state.startDate }                  
                  />                  
                  <FormComponent
                    labelClass="bold label-sm"
                    label="Agreement End Date"                    
                    type="date"
                    name="endDate"                  
                    change={ this.onChange }
                    value={ this.state.endDate }                    
                  />                  
                </Col>
                <Col md="4">
                  <FormGroup>
                    <Label className="bold label-sm">Business Domain</Label>
                    <Input
                      type="select"
                      name="domain"
                      className="form-control-sm"
                      value={ this.state.domain }
                      onChange={ this.onChange }
                      required
                    >
                      <option value="IT">IT</option>
                      <option value="BPO/KPO">BPO/KPO</option>
                      <option value="ITES">ITES</option>
                      <option value="Finance">Banking/Finance</option>
                      <option value="E-Commerce">Retail/E-Commerce</option>
                      <option value="Automotive">Automotive</option>
                      <option value="EPC">EPC</option>
                      <option value="Medical">Medical/Pharmaceutical</option>
                    </Input>
                  </FormGroup>                  
                  <FormComponent
                    labelClass="bold label-sm"
                    label="Remarks"                    
                    type="textarea"
                    name="remarks"                  
                    change={ this.onChange }
                    value={ this.state.remarks }
                    required={true}
                  />                  
                </Col>
              </Row>
              <div className="center">
                <button type="submit" className="btn center login-button white-text">Add</button>
              </div>
            </Form>
          </Container>
        {this.state.message? <Notifier message={this.state.message} />: null}
        {this.state.error? <ErrorNotifier message={this.state.error} />: null}
      </div>
    );
  }
}

AddCustomer.propTypes = {
  addCompany: PropTypes.func.isRequired
}
export default connect(
  null,
  { addCompany }
)(AddCustomer);