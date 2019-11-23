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
import { addSales } from '../../../../redux/actions/salesActions'
import { Validator, errors, submitValidator } from '../../../common/Validator'
import FormComponent from '../../../common/FormComponent'
import Notifier from '../../../aside/Notifier'
import ErrorNotifier from '../../../aside/ErrorNotifier'

class AddNewForm extends Component {
  constructor(){
    super();
    this.state = {
      name: '',
      domain: 'Commercial',
      vertical: 'Manufacturing',
      geo: 'ANZ',
      busType: 'NN',
      deal: 'Integrated deal',
      tcv: 'TBD',
      oppType: 'Proactive',
      status: 'New',
      winProb: 'High',
      remarks: '',
      services: '',
      ccName: '',
      ccDesg: '',
      ccMail: '',
      ccNo: '',
      owner: '',
      presDate: '',
      review: '',
      received: '',
      submissionDate: '',
      errors: {},
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
      customerName: this.state.name,
      domainGroup: this.state.domain,
      vertical: this.state.vertical,
      geo: this.state.geo,
      businessType: this.state.busType,
      dealType: this.state.deal,
      estimatedTcv: this.state.tcv,
      opportunityType: this.state.oppType,
      status: this.state.status,
      winProbability: this.state.winProb,
      remarks: this.state.remarks,
      services: this.state.services,
      customerContactName: this.state.ccName,
      ccDesignation: this.state.ccDesg,
      ccEmail: this.state.ccMail,
      ccNumber: this.state.ccNo,
      opportunityOwnerName:this.state.owner,
      customerPresentationDate: this.state.presDate,
      internalReviewDate: this.state.review,
      requestReceivedDate: this.state.received,
      submissionDate: this.state.submissionDate
    }    
    if(errors.valid){
      this.props.addSales(data, this.props.history);
    } else {
      this.setState({
        error: 'Fill all mandatory fields'
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
          <Link to="/employee/sales">
          <i
            className="material-icons pointer"
            style={{position:'absolute', top: '5px', right: '5px', color: '#C00'}}
          >cancel</i>
          </Link>
          <h5 className="center bold pt-2">New Sales</h5>
          <Form onSubmit={this.onSubmit} className="p-3" noValidate>
            <Row>
              <Col md="4">
                <FormComponent
                  labelClass="bold label-sm"
                  label="Customer Name"
                  type="text"
                  name="name"
                  value={this.state.name}
                  change={this.onChange}
                  required={true}
                />
                <FormGroup>
                  <Label className="bold label-sm">Domain Type</Label>
                  <Input
                    type="select"
                    name="domain"
                    value={this.state.value}
                    className="form-control-sm"
                    onChange={this.onChange}
                    required
                  >
                    <option value="BFSI">BFSI</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Healthcare">Healthcare</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label className="bold label-sm">Vertical</Label>
                  <Input
                    type="select"
                    name="vertical"
                    value={this.state.vertical}
                    className="form-control-sm"
                    onChange={this.onChange}
                    required
                  >
                    <option value="BNK">BNK</option>
                    <option value="CMS">CMS</option>
                    <option value="FNS">FNS</option>
                    <option value="INS">INS</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label className="bold label-sm">Geography</Label>
                  <Input
                    type="select"
                    name="geo"
                    value={this.state.geo}
                    className="form-control-sm"
                    onChange={this.onChange}
                    required
                  >
                    <option value="Americas">Americas</option>
                    <option value="APAC">APAC</option>
                    <option value="ANZ">ANZ</option>
                    <option value="Europe">Europe</option>
                    <option value="UK">UK</option>
                    <option value="Middle East">Middle East</option>
                    <option value="">India</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label className="bold label-sm">Business Type</Label>
                  <Input
                    type="select"
                    name="busType"
                    value={this.state.busType}
                    className="form-control-sm"
                    onChange={this.onChange}
                    required
                  >
                    <option value="ER">Existing business - Renewal</option>
                    <option value="EN">Existing Business - New Business</option>
                    <option value="NN">Net New Business</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label className="bold label-sm">Deal Type</Label>
                  <Input
                    type="select"
                    name="deal"
                    value={this.state.deal}
                    className="form-control-sm"
                    onChange={this.onChange}
                    required
                  >
                    <option value="Integrated">Integrated</option>
                    <option value="Development only">Development only</option>
                    <option value="Testing">Testing Only</option>
                    <option value="Support">Support Only</option>
                    <option value="Implementation">Implementation Services</option>
                    <option value="Professional">Professional Services</option>
                  </Input>
                </FormGroup>
                <FormComponent
                  labelClass="bold label-sm"
                  label="Internal Review Date"
                  type="date"
                  name="review"
                  value={this.state.review}
                  change={this.onChange}
                />
              </Col>
              <Col md="4">
                <FormComponent
                  labelClass="bold label-sm"
                  label="Estimated TCV ( in millions )"
                  type="number"
                  name="tcv"
                  value={this.state.tcv}
                  change={this.onChange}
                />
                <FormGroup>
                  <Label className="bold label-sm">Opportunity Type</Label>
                  <Input
                    type="select"
                    name="oppType"
                    value={this.state.oppType}
                    className="form-control-sm"
                    onChange={this.onChange}
                    required
                  >
                    <option value="Proactive">Proactive</option>
                    <option value="RFP">RFP</option>
                    <option value="Reference">Reference</option>
                    <option value="Leads">Leads</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label className="bold label-sm">Status</Label>
                  <Input
                    type="select"
                    name="status"
                    value={this.state.status}
                    className="form-control-sm"
                    onChange={this.onChange}
                    required
                  >
                    <option value="New">New</option>
                    <option value="WIP">Work In Progress</option>
                    <option value="Won">Won</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Lost">Lost</option>
                    <option value="Hold">On Hold</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label className="bold label-sm">Win Probability</Label>
                  <Input
                    type="select"
                    name="winProb"
                    value={this.state.winProb}
                    className="form-control-sm"
                    onChange={this.onChange}
                    required
                  >
                    <option value="High">High</option>
                    <option value="Very High">Very High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                    <option value="Unknown">Unknown</option>
                  </Input>
                </FormGroup>
                <FormComponent
                  labelClass="bold label-sm"
                  label="Remarks"
                  type="text"
                  name="remarks"
                  value={this.state.remarks}
                  change={this.onChange}
                  required={true}
                />
                <FormComponent
                  labelClass="bold label-sm"
                  label="Services"
                  type="text"
                  name="services"
                  value={this.state.services}
                  change={this.onChange}
                  required={true}
                />
                <FormComponent
                  labelClass="bold label-sm"
                  label="Customer Contact Name"
                  type="text"
                  name="ccName"
                  value={this.state.ccName}
                  change={this.onChange}
                  required={true}
                />
              </Col>
              <Col md="4">
                <FormComponent
                  labelClass="bold label-sm"
                  label="Customer Contact Designation"
                  type="text"
                  name="ccDesg"
                  value={this.state.ccDesg}
                  change={this.onChange}
                  required={true}
                />
                <FormComponent
                  labelClass="bold label-sm"
                  label="Customer Contact Number"
                  type="number"
                  name="ccNo"
                  value={this.state.ccNo}
                  change={this.onChange}                  
                />
                <FormComponent
                  labelClass="bold label-sm"
                  label="Customer Contact Mail"
                  type="email"
                  name="ccMail"
                  value={this.state.ccMail}
                  change={this.onChange}                  
                />
                <FormComponent
                  labelClass="bold label-sm"
                  label="Opportunity Owner"
                  type="text"
                  name="owner"
                  value={this.state.owner}
                  change={this.onChange}
                  required={true}
                />
                <FormComponent
                  labelClass="bold label-sm"
                  label="Customer Presentation Date"
                  type="date"
                  name="presDate"
                  value={this.state.presDate}
                  change={this.onChange}     
                  required             
                />
                <FormComponent
                  labelClass="bold label-sm"
                  label="Submission Date"
                  type="date"
                  name="submissionDate"
                  value={this.state.submissionDate}
                  change={this.onChange}     
                  required             
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
  newSales: PropTypes.func.isRequired
}

export default connect(
  null,
  { addSales }
)(AddNewForm);