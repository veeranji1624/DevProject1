import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label
} from 'reactstrap'
import { updateCustomer } from '../../redux/actions/customerAction'
import AgreementUpload from '../employee/customer/AgreementUpload'
import { Validator, submitValidator, errors } from '../common/Validator'
import FormComponent from '../common/FormComponent'
import Notifier from './Notifier'
import ErrorNotifier from './ErrorNotifier'

class CustomerDetails extends Component{
  constructor(props){
    super(props);
    const {
      compFullName,
      compFullAddress,
      areasServed,
      compCreatorId,
      compPocFullName,
      compPocEmail,
      compPocMobileNumber,
      compRemarks,
      createdOn,
      compActiveStatus,
      agrmntStartDate,
      agrmntEndDate      
    } = this.props.customer;
    this.state = {
      permissionlist: this.props.auth.permissionlist,
      cName: compFullName,
      addr: compFullAddress,
      creator: compCreatorId,
      pocName: compPocFullName,
      pocMail: compPocEmail,
      pocMobile: compPocMobileNumber,
      area: areasServed,
      remarks: compRemarks,
      addedOn: createdOn,
      status: compActiveStatus,
      startDate: agrmntStartDate,
      endate: agrmntEndDate,
      edit: false,
      message: '',
      error: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidUpdate(prevProps){
    if(prevProps.message){
      setTimeout(() => {
        this.props.back();
      }, 2000)
    }

    if((prevProps.auth !== this.props.auth) ){
      this.setState({
     
       permissionlist: this.props.auth.permisssionlist
      })
 
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
    let comp = {
      compCode: this.props.customer.compCode,
      compFullName: this.state.cName,
      compFullAddress: this.state.addr,
      areasServed: this.state.area,
      //compCreatorId: this.state.creator,
      compPocFullName: this.state.pocName,
      compPocEmail: this.state.pocMail,
      compPocMobileNumber: this.state.pocMobile,
      compRemarks: this.state.remarks,
      compActiveStatus: this.state.status,
      agrmntStartDate: this.state.startDate,
      agrmntEndDate: this.state.endate,
      updatedBy: localStorage.getItem('id')
    }
    if(errors.valid){    
      this.props.updateCustomer(comp, this.props.history);
      } else {
        this.setState({
          errors: 'Enter all mandatory fields'
        })
      }
  }

  componentDidMount() {
    this.setState({
      permissionlist:this.props.auth.permissionlist
      });
  }
  render(){ 
    const { permissionlist } = this.state;
    
    let currentPermission;    


    for(let x in permissionlist.response.permissions) {
      if(permissionlist.response.permissions[x].groupId == "2.1") {
        currentPermission = permissionlist.response.permissions[x];
      }
      else{
        console.log('the for loop if condition is false');
      }
    }
    return(
      <Row>
        { !this.state.edit
          ?(<Col md="12">            
            <h5 className="bold center mb-4">Customer Details</h5>
            <Row>
              <Col md="6">
                <ul className="list-group">
                  <li className="list-group-item">
                    <span className="label-sm bold grouped-item">
                      Company Name : 
                    </span>
                    <span className="grouped-item label-sm">
                      { this.state.cName }
                    </span>
                  </li>
                  <li className="list-group-item">
                    <span className="label-sm bold grouped-item">
                      Company Address : 
                    </span>
                    <span className="grouped-item label-sm">
                      { this.state.addr }
                    </span>                    
                  </li>
                  <li className="list-group-item">
                    <span className="label-sm bold grouped-item">
                      Created By : 
                    </span>
                    <span className="grouped-item label-sm">
                      { this.state.creator }
                    </span>                    
                  </li>
                  <li className="list-group-item">
                    <span className="label-sm bold grouped-item">
                      Point of Contact Name : 
                    </span>
                    <span className="grouped-item label-sm">
                      { this.state.pocName }
                    </span>                    
                  </li>
                  <li className="list-group-item">
                    <span className="label-sm bold grouped-item">
                      Point of Contact Email : 
                    </span>
                    <span className="grouped-item label-sm">
                      { this.state.pocMail }
                    </span>                                      
                  </li>
                  <li className="list-group-item">
                    <span className="label-sm bold grouped-item">
                      Point of Contact Mobile : 
                    </span>
                    <span className="grouped-item label-sm">
                      { this.state.pocMobile }          
                    </span>
                  </li> 
                </ul>                
              </Col>
              <Col md="6">
                <ul>
                  <li className="list-group-item">
                    <span className="label-sm bold grouped-item">
                      Start date : 
                    </span>
                    <span className="grouped-item label-sm">
                      { this.state.startDate }
                    </span>                    
                  </li>
                  <li className="list-group-item">
                    <span className="label-sm bold grouped-item">
                      End Date : 
                    </span>
                    <span className="grouped-item label-sm">
                      { this.state.endate }
                    </span>                    
                  </li>
                  <li className="list-group-item">
                    <span className="label-sm bold grouped-item">
                      Remarks : 
                    </span>
                    <span className="grouped-item label-sm">
                      { this.state.remarks }
                    </span>
                  </li>
                  <li className="list-group-item">
                    <span className="label-sm bold grouped-item">
                      Added On : 
                    </span>
                    <span className="grouped-item label-sm">
                      { this.state.addedOn }
                    </span>                    
                  </li>
                  <li className="list-group-item">
                    <span className="label-sm bold grouped-item">
                      Areas Served : 
                    </span>
                    <span className="grouped-item label-sm">
                      { this.state.area }
                    </span>
                  </li>
                  <li className="list-group-item">
                    <span className="grouped-item bold label-sm">
                      Status :
                    </span>
                    <span className="grouped-item label-sm">
                      { this.state.status }
                    </span>
                  </li> 
                </ul>
              </Col>
              {(currentPermission.update) ?
              <Row>
                <Col md="12" className="center">
                  <button
                    className="btn login-button white-text"
                    onClick={()=>this.setState({edit:!this.state.edit})}>
                    Update
                  </button>
                </Col>
                <Col md="12">
                  <AgreementUpload comp={this.props.customer.compCode} />
                </Col>
              </Row>:null}
            </Row>
          </Col>)
          :(<Col md="12">
          <h5 className="bold center">Update Customer</h5>
          <Form onSubmit={this.onSubmit} className="p-3" noValidate>
            <Row>
              <Col md="6">
                <FormComponent
                  labelClass="bold label-sm"
                  label="Company name"                  
                  name="cName"
                  type="text"                
                  change={this.onChange}
                  value={this.state.cName}
                  required={true}
                />                
                <FormComponent
                  labelClass="bold label-sm"
                  label="Company Address"                  
                  name="addr"
                  type="text"
                  change={this.onChange}
                  value={this.state.addr}
                  required={true}
                />                
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
                  label="Agreement start date"
                  name="startDate"
                  type="date"
                  change={this.onChange}
                  value={this.state.startDate}
                  required={true}
                />
                <FormComponent
                  labelClass="bold label-sm"
                  label="Agreement end date"
                  name="endate"
                  type="date"
                  change={this.onChange}
                  value={this.state.endate}
                  required={true}
                />
              </Col>
              <Col md="6">
                <FormComponent
                  labelClass="bold label-sm"
                  label="Point of contact name"
                  name="pocName"
                  type="text"
                  change={this.onChange}
                  value={this.state.pocName}
                  required={true}
                />
                <FormComponent
                  labelClass="bold label-sm"
                  label="Point of contact email"
                  name="pocMail"
                  type="email"                    
                  change={this.onChange}
                  value={this.state.pocMail}
                  required={true}
                />                
                <FormComponent
                  labelClass="bold label-sm"
                  label="POC contact"                  
                  name="pocMobile"
                  type="number"                
                  change={this.onChange}
                  value={this.state.pocMobile}
                  required={true}
                />                                
                <FormGroup>
                  <Label className="bold label-sm">Company Status</Label>
                  <Input
                    name="status"
                    type="select"
                    className="form-control-sm"
                    onChange={this.onChange}
                    value={this.state.status}
                  >
                    <option value="Active">Not Active</option>
                    <option value="Inactive">Active</option>
                  </Input>
                </FormGroup>
                <FormComponent
                  labelClass="bold label-sm"
                  label="Remarks"                  
                  name="remarks"
                  type="text"
                  change={this.onChange}
                  value={this.state.remarks}
                  required={true}
                />
              </Col>
            </Row>
            <div className="center">
              <button
                type="submit"
                className="btn btn-custom"                
              >
                Update
              </button>
            </div>
          </Form>
          </Col>)}       
          {this.props.customers.message?<Notifier message={this.props.customers.message} />:null}
          {this.state.error?<ErrorNotifier message={this.state.error} />:null}
        </Row>
      )
    }
}

CustomerDetails.propTypes = {
  customer: PropTypes.object.isRequired,
  customers: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  updateCustomer:PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  customers: state.customers,
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { updateCustomer }
)(CustomerDetails);