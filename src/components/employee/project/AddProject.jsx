import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import FormComponent from '../../common/FormComponent'
import { NEW_PROJECT } from '../../../utils/routes'
import { Validator, submitValidator, errors } from '../../common/Validator'
import Notifier from '../../aside/Notifier'
import ErrorNotifier from '../../aside/ErrorNotifier'
 
class AddProject extends Component {
  constructor() {
    super();
    this.state = {
      coName: '',
      name: '',
      description: '',
      type: 'Small',
      billType: 'T M',
      startDate: '',
      endDate: '',
      effort: '',
      cost: '',
      currency: 'AUD',
      location: 'Bangalore',
      status: 'New',
      spoc: '',
      resources: '',
      comment: '',
      message: '',
      error: ''
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
    let project = {
      proCreatorId: localStorage.getItem('id'),
      companyName: this.state.coName,
      projectName: this.state.name,
      description: this.state.description,
      projectType: this.state.type,
      billingType: this.state.billType,
      plannedStart: this.state.startDate,
      plannedEnd: this.state.endDate,
      effort: this.state.effort,
      budget: this.state.cost,
      currency: this.state.currency,
      location: this.state.location,
      status: this.state.status,
      projCustSpoc: this.state.spoc,
      resources: this.state.resources,
      comment: this.state.comment
    }
    if(errors.valid){
      axios.post(
          NEW_PROJECT,
          project,
          {withCredentials: true}
        )
         .then(res => {
           this.setState({
            message: 'Added Successfully'
           })
           setTimeout(() => {
            this.props.history.push('/employee/projects');
          }, 5000)
        })
        .catch(err => {
          this.setState({
            error: 'Could not add new project'
          })
        })
        setInterval(() => {
          this.setState({
            message: '',
            error: ''
          })        
        }, 5000)
    }else{
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
  render(){
    let shrink;
    this.props.sidebar? shrink = 'scale': shrink =  'no-scale';
    return(
      <div className={shrink}>
        <h5 className="center bold">Add Project</h5>
          <Container className="card container-card">
            <Link to="/employee/projects">
              <i className="material-icons cancel-button">cancel</i>
            </Link>
            <Form onSubmit={this.onSubmit} className="p-3" noValidate>
              <Row>
                <Col md="4">
                  <FormComponent
                    labelClass="bold label-sm"
                    label="Company Name"
                    type="text"
                    name="coName"
                    inputClass="form-control-sm"
                    value={this.state.coName}
                    change={this.onChange}
                    placeholder="Full name of the company"
                    required={true}
                  />
                  <FormComponent
                    labelClass="bold label-sm"
                    label="Project Name"
                    type="text"
                    name="name"
                    inputClass="form-control-sm"
                    value={this.state.name}
                    change={this.onChange}
                    placeholder="Project Name"
                    required={true}
                  />
                  <FormGroup>
                    <Label className="bold label-sm">Project Type</Label>
                    <Input
                      type="select"
                      name="type"
                      className="form-control-sm"
                      onChange={this.onChange}
                      value={this.state.type}
                      required
                    >
                      <option value="Small">Small Project</option>
                      <option value="Large">Large Projects</option>
                      <option value="Service">Service</option>
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label className="bold label-sm">Billing Type</Label>
                    <Input
                      type="select"
                      name="billType"
                      className="form-control-sm"
                      onChange={this.onChange}
                      value={this.state.billType}
                      required
                    >
                      <option value="T M">T&M</option>
                      <option value="Fixed">Fixed</option>
                    </Input>
                  </FormGroup>
                  <FormComponent
                    labelClass="bold label-sm"
                    label="Project Description"
                    type="textarea"
                    name="description"
                    inputClass="form-control-sm"
                    value={this.state.description}
                    change={this.onChange}
                    required={true}
                  />
                </Col>
                <Col md="4">
                  <FormComponent
                    labelClass="bold label-sm"
                    label="Start Date"
                    type="date"
                    name="startDate"
                    inputClass="form-control-sm"
                    value={this.state.startDate}
                    change={this.onChange}
                    required={true}
                  />
                  <FormGroup>
                    <Label className="bold label-sm">End Date</Label>
                    <Input
                      type="date"
                      name="endDate"
                      onChange={this.onChange}
                      className="form-control-sm"
                      value={this.state.endDate}
                      required
                    />
                  </FormGroup>
                  <FormComponent
                    labelClass="bold label-sm"
                    label="Effort (Hours)"
                    type="number"
                    name="effort"
                    inputClass="form-control-sm"
                    value={this.state.effort}
                    change={this.onChange}
                    required={true}
                  />
                  <FormComponent
                    labelClass="bold label-sm"
                    label="Budget Cost"
                    type="number"
                    name="cost"
                    inputClass="form-control-sm"
                    value={this.state.cost}
                    change={this.onChange}
                    required={true}
                  />
                  <FormGroup>
                    <Label className="bold label-sm">Currency</Label>
                    <Input
                      type="select"
                      name="currency"
                      className="form-control-sm"
                      value={this.state.currency}
                      onChange={this.onChange}
                      required
                    >
                      <option value="AUD">AUD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                      <option value="INR">INR</option>
                      <option value="SGD">SGD</option>
                      <option value="USD">USD</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormComponent
                    labelClass="bold label-sm"
                    label="Project Location"
                    type="text"
                    name="location"
                    inputClass="form-control-sm"
                    value={this.state.location}
                    change={this.onChange}
                    required={true}
                  />
                  <FormGroup>
                    <Label className="bold label-sm">Project Status</Label>
                    <Input
                      type="select"
                      name="status"
                      className="form-control-sm"
                      onChange={this.onChange}
                      value={this.state.status}
                      required
                    >
                      <option value="New">New</option>
                      <option value="Work in progress">Work in progress</option>
                      <option value="Delay">Delay</option>
                      <option value="Completed">Completed</option>
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label className="bold label-sm">Project SPOC</Label>
                    <Input
                      type="select"
                      name="spoc"
                      className="form-control-sm"
                      value={this.state.spoc}
                      onChange={this.onChange}
                      required
                    >
                      <option value="0">Bebin Suresh</option>
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label className="bold label-sm">Project Resources</Label>
                    <Input
                      type="select"
                      name="resources"
                      className="form-control-sm"
                      value={this.state.resources}
                      onChange={this.onChange}
                      required
                    >
                      <option value="0">Bebin Suresh</option>
                    </Input>
                  </FormGroup>
                  <FormComponent
                    labelClass="bold label-sm"
                    label="Comments"
                    type="textarea"
                    name="comment"
                    inputClass="form-control-sm"
                    value={this.state.comment}
                    change={this.onChange}
                    required={true}
                  />
                </Col>
              </Row>
              <div className="center">
                <button type="submit" className="btn center login-button white-text">Add Project</button>
              </div>
            </Form>
          </Container>
        {this.state.message? <Notifier message={this.state.message} />: null}
        {this.state.error? <ErrorNotifier message={this.state.error} />: null}
      </div>
    );
  }
}
export default AddProject;