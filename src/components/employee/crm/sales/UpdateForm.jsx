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
import { updateSales } from '../../../../redux/actions/salesActions'
import { Validator, errors, submitValidator } from '../../../common/Validator'
import FormComponent from '../../../common/FormComponent'
import Notifier from '../../../aside/Notifier'
import ErrorNotifier from '../../../aside/ErrorNotifier'

class UpdateForm extends Component {
  constructor(props){
    super(props);
    const {
      saleId,
      customerName,
      domainGroup,
      vertical,
      geo,
      opportunityType,
      dealType,
      estimatedTcv,
      winProbability,
      remarks,
      services,
      customerContactName,
      ccDesignation,
      ccEmail,
      ccNumber,
      opportunityOwnerName,
      opportunityOwnerEmail,
      solutionSpoc,
      internalReviewDate,
      submissionDate,
      customerPresentationDate,
      supportQuarter,
      status
    } = props.item;
    this.state = {
      salesId: saleId,
      name: customerName,
      domain: domainGroup,
      vertical: vertical,
      geo: geo,
      busType: opportunityType,
      deal: dealType,
      tcv: estimatedTcv,
      oppType: opportunityType,
      ownerEmail: opportunityOwnerEmail,
      spoc: solutionSpoc,
      status: status,
      winProb: winProbability,
      remarks: remarks,
      services: services,
      ccName: customerContactName,
      ccDesg: ccDesignation,
      ccMail: ccEmail,
      ccNo: ccNumber,
      owner: opportunityOwnerName,      
      review: internalReviewDate,
      submission:submissionDate,
      presentation: customerPresentationDate,
      quarter: supportQuarter,
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
      saleId: this.state.salesId,
      customerName: this.state.name,
      domainGroup: this.state.domain,
      vertical: this.state.vertical,
      geo: this.state.geo,
      businessType: this.state.busType,
      dealType: this.state.deal,
      estimatedTcv: this.state.tcv,
      opportunityType: this.state.oppType,
      opportunityOwnerEmail: this.state.ownerEmail,
      solutionSpoc: this.state.spoc,
      status: this.state.status,
      winProbability: this.state.winProb,
      remarks: this.state.remarks,
      services: this.state.services,
      customerContactName: this.state.ccName,
      ccDesignation: this.state.ccDesg,
      ccEmail: this.state.ccMail,
      ccNumber: this.state.ccNo,
      opportunityOwnerName: this.state.owner,
      internalReviewDate: this.state.review,
      submissionDate: this.state.submission,
      customerPresentationDate: this.state.presentation,
      supportQuarter: this.state.quarter,
    }        
    if(errors.valid){      
      this.props.updateSales(data, this.props.history);
      }
  }
  render() {    
    let shrink;
    this.props.sidebar?shrink="scale":shrink="no-scale";
    return (
      <div className={shrink}>
        <Container className="card container-card mt--5">
          <i
            className="material-icons pointer"
            style={{position:'absolute', top: '5px', right: '5px', color: '#C00'}}
            onClick={() => this.props.back()}>cancel</i>
          <h5 className="center bold p-1">Update Sales</h5>
          <Form onSubmit={this.onSubmit} className="p-1" noValidate>
            <Row>
              <Col md="4">
                <FormComponent
                  group="mt--5"
                  labelClass="bold label-sm"
                  label="Customer Name"
                  type="text"
                  name="name"
                  value={this.state.name}              
                  change={this.onChange}
                  required={true}
                />                
                <FormGroup className="mt--5">
                  <Label className="bold label-sm">Domain Type</Label>
                  <Input
                    type="select"
                    name="domain"
                    value={this.state.value}
                    className="form-control-sm"
                    onChange={this.onChange}
                  >
                    <option value="BFSI">BFSI</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Healthcare">Healthcare</option>
                  </Input>
                </FormGroup>
                <FormGroup className="mt--5">
                  <Label className="bold label-sm">Vertical</Label>
                  <Input
                    type="select"
                    name="vertical"
                    value={this.state.vertical}
                    className="form-control-sm"
                    onChange={this.onChange}
                  >
                    <option value="BNK">BNK</option>
                    <option value="CMS">CMS</option>
                    <option value="FNS">FNS</option>
                    <option value="INS">INS</option>
                  </Input>
                </FormGroup>
                <FormGroup className="mt--5">
                  <Label className="bold label-sm">Geography</Label>
                  <Input
                    type="select"
                    name="geo"
                    value={this.state.geo}
                    className="form-control-sm"
                    onChange={this.onChange}
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
                <FormGroup className="mt--5">
                  <Label className="bold label-sm">Business Type</Label>
                  <Input
                    type="select"
                    name="busType"
                    value={this.state.busType}
                    className="form-control-sm"
                    onChange={this.onChange}
                  >
                    <option value="ER">Existing business - Renewal</option>
                    <option value="EN">Existing Business - New Business</option>
                    <option value="NN">Net New Business</option>
                  </Input>
                </FormGroup>
                <FormGroup className="mt--5">
                  <Label className="bold label-sm">Deal Type</Label>
                  <Input
                    type="select"
                    name="deal"
                    value={this.state.deal}
                    className="form-control-sm"
                    onChange={this.onChange}
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
                  group="mt--5"
                  label="Opportunity Owner Email"
                  type="email"
                  name="ownerEmail"
                  value={this.state.ownerEmail}              
                  change={this.onChange}                  
                />                
                <FormComponent
                  labelClass="bold label-sm"
                  group="mt--5"
                  label="Solution SPOC"
                  type="text"
                  name="spoc"
                  value={this.state.spoc}              
                  change={this.onChange}
                  required={true}
                />                
              </Col>
              <Col md="4">
                <FormComponent
                  labelClass="bold label-sm"
                  group="mt--5"
                  label="Estimated TCV ( in millions )"
                  type="number"
                  name="tcv"
                  value={this.state.tcv}              
                  change={this.onChange}
                  required={true}
                />                
                <FormGroup className="mt--5">
                  <Label className="bold label-sm">Opportunity Type</Label>
                  <Input
                    type="select"
                    name="oppType"
                    value={this.state.oppType}
                    className="form-control-sm"
                    onChange={this.onChange}
                  >
                    <option value="Proactive">Proactive</option>
                    <option value="RFP">RFP</option>
                    <option value="Reference">Reference</option>
                    <option value="Leads">Leads</option>
                  </Input>
                </FormGroup>
                <FormGroup className="mt--5">
                  <Label className="bold label-sm">Status</Label>
                  <Input
                    type="select"
                    name="status"
                    value={this.state.status}
                    className="form-control-sm"
                    onChange={this.onChange}
                  >
                    <option value="New">New</option>
                    <option value="WIP">Work In Progress</option>
                    <option value="Won">Won</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Lost">Lost</option>
                    <option value="Hold">On Hold</option>
                  </Input>
                </FormGroup>
                <FormGroup className="mt--5">
                  <Label className="bold label-sm">Win Probability</Label>
                  <Input
                    type="select"
                    name="winProb"
                    value={this.state.winProb}
                    className="form-control-sm"
                    onChange={this.onChange}
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
                  group="mt--5"
                  label="Remarks"
                  type="text"
                  name="remarks"
                  value={this.state.remarks}
                  change={this.onChange}
                  required={true}
                />
                <FormComponent
                  labelClass="bold label-sm"
                  group="mt--5"
                  label="Services"
                  type="text"
                  name="services"
                  value={this.state.services}
                  change={this.onChange}
                />
                <FormComponent
                  labelClass="bold label-sm"
                  group="mt--5"
                  label="Customer Presentation Date"
                  type="date"
                  name="presentation"
                  value={this.state.presentation}
                  change={this.onChange}
                />
                <FormComponent
                  labelClass="bold label-sm"
                  group="mt--5"
                  label="Support Quarter"
                  type="text"
                  name="quarter"
                  value={this.state.quarter}
                  change={this.onChange}
                />
              </Col>
              <Col md="4">
                <FormComponent
                  labelClass="bold label-sm"
                  label="Customer Contact Name"
                  type="text"
                  name="ccName"
                  value={this.state.ccName}
                  change={this.onChange}
                  required={true}
                />
                <FormComponent
                  labelClass="bold label-sm"
                  group="mt--5"
                  label="Customer Contact Designation"
                  type="text"
                  name="ccDesg"
                  value={this.state.ccDesg}
                  change={this.onChange}
                  required={true}
                />
                <FormComponent
                  labelClass="bold label-sm"
                  group="mt--5"
                  label="Customer Contact Number"
                  type="number"
                  name="ccNo"
                  value={this.state.ccNo}
                  change={this.onChange}
                />
                <FormComponent
                  labelClass="bold label-sm"
                  group="mt--5"
                  label="Customer Contact Mail"
                  type="email"
                  name="ccMail"
                  value={this.state.ccMail}
                  change={this.onChange}
                />
                <FormComponent
                  labelClass="bold label-sm"
                  group="mt--5"
                  label="Opportunity Owner"
                  type="text"
                  name="owner"
                  value={this.state.owner}
                  change={this.onChange}
                  required={true}
                />
                <FormComponent
                  labelClass="bold label-sm"
                  group="mt--5"
                  label="Internal Review Date"
                  type="date"
                  name="review"
                  value={this.state.review}
                  change={this.onChange}
                />                
                <FormComponent
                  labelClass="bold label-sm"
                  group="mt--5"
                  label="Submission Date"
                  type="date"
                  name="submission"
                  value={this.state.submission}                  
                  change={this.onChange}
                />
              </Col>
            </Row>
            <div className="center">
              <button className="btn center login-button white-text">Update Sales</button>
            </div>
          </Form>
        </Container>
        {this.props.sales.message? <Notifier message={this.props.sales.message} />: null}
        {this.state.error? <ErrorNotifier message={this.state.error} />: null}
      </div>
    )
  }
}

UpdateForm.propTypes = {
  sales: PropTypes.object.isRequired,
  updateSales: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  sales: state.sales
})

export default connect(
  mapStateToProps,
  { updateSales }
)(UpdateForm);