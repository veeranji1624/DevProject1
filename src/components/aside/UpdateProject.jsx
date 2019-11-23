import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import axios from 'axios'
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";
import { EMPLOYEE_LIST, UPDATE_PROJECT } from '../../utils/routes'
import { updateProject } from '../../redux/actions/projectActions'
import { Validator, submitValidator, errors } from '../common/Validator'
import FormComponent from '../common/FormComponent'
import Notifier from './Notifier'
import ErrorNotifier from './ErrorNotifier'
 
class ProjectDetails extends Component {
  constructor(props) {
    super(props);
    const {
      projCode,
      companyName,
      projectName,
      effort,
      plannedStart,
      plannedEnd,
      budget,
      currency,
      location,
      status,
      description,
      resources,
      projPmName,
      projCustSpoc,
      projSpocContactNo,
      projSpocEmail,
      comment,      
      projectType,
      billingType,      
    } = this.props.item;
    this.state = {
      projCode: projCode,      
      compName: companyName,
      projName: projectName,
      startDate: plannedStart,
      endDate: plannedEnd,
      effort: effort,
      budget: budget,
      currency: currency,
      location: location,
      status: status,
      description: description,
      spoc: projCustSpoc,
      spocNo: projSpocContactNo,
      spocMail: projSpocEmail,
      resources: resources,
      pmName: projPmName,
      projType: projectType,
      billType: billingType,
      remarks: comment,
      managers: [],
      message: null,
      error: null
    };
    this.onChange = this.onChange.bind(this);    
    this.onSubmit = this.onSubmit.bind(this);    
  }

  // componentDidUpdate(prevProps){
  //   if(prevProps.project !== this.props.project){
  //     this.setState({
  //       message: this.props.project.message
  //     })
  //   }
  // }
  
  componentDidMount(){
    axios.get(EMPLOYEE_LIST, {withCredentials: true})
      .then(res => {
        console.log(res.data);
        this.setState({
          managers: res.data
        })
      })
  }
  
  onChange(e) {
    e.preventDefault();
    Validator(e.target);
    this.setState({
      [e.target.name]: e.target.value
    });
  }  
  
  onSubmit(e) {
    e.preventDefault(); 
    submitValidator(e.target);
    let project = {
      updatedBy: localStorage.getItem('id'),
      projCode: this.state.projCode,
      companyName: this.state.compName,
      projectName: this.state.projName,
      plannedStart: this.state.startDate,
      plannedEnd: this.state.endDate,
      effort: this.state.effort,
      budget: this.state.budget,
      currency: this.state.currency,
      location: this.state.location,
      status: this.state.status,
      description: this.state.description,
      projCustSpoc: this.state.spoc,
      projSpocContactNo: this.state.spocNo,
      projSpocEmail:this.state.spocMail,
      resources: this.state.resources,
      projPmName: this.state.pmName,
      projectType: this.state.projType,
      billingType: this.state.billType,
      comment: this.state.remarks
    };
    if(errors.valid){
      //this.props.updateProject(project);
      axios.post(UPDATE_PROJECT, project)
        .then(res => {
          this.setState({
            message: 'Updated successfully'
          })
          this.props.history.push('/employee/projects');
        })
        .catch(err => {
          this.setState({
            error: 'Could not update'
          })
        })
        setTimeout(() => {
          this.setState({
            message: null,
            error: null
          })
        }, 2000)
    }else{
      this.setState({
        error: 'Enter all mandatory fields'
      })
      setTimeout(() => {
        this.setState({
          error: ''
        })
      }, 5000)
    }
  }
  render() {
    // if(this.props.project.message){
    //   setTimeout(() => {
    //     this.props.history.push('/employee/projects');
    //   }, 2000)
    //}
    return (
      <Container className="container-card" style={{position: 'relative'}}>
        <i
          className="cancel-button material-icons pointer"
          onClick={this.props.back}
        >cancel</i>
        <Form onSubmit={ this.onSubmit } className="p-3" noValidate>
          <h5 className="bold center">Update Project</h5>
          <Row>
            <Col md="4">                          
              <FormComponent
                label="Company Name"
                labelClass="label-sm bold"
                type="text"
                name="compName"
                value={this.state.compName}
                change={this.onChange}
                required={true}
              />
              <FormComponent                
                label="Project Name"
                labelClass="label-sm bold"
                type="text"
                name="projName"
                value={this.state.projName}
                change={this.onChange}
                required={true}
              />
              <FormComponent                
                label="Start Date"
                labelClass="label-sm bold"
                type="date"
                name="startDate"
                value={this.state.startDate}
                change={this.onChange}                
              />
              <FormComponent
                label="End Date"
                labelClass="label-sm bold"
                type="date"
                name="endDate"
                value={this.state.endDate}
                change={this.onChange}                
              />
              <FormComponent                
                label="Project Customer Spoc"
                labelClass="label-sm bold"
                type="text"
                name="spoc"
                value={this.state.spoc}
                change={this.onChange}
                required={true}
              />
              <FormComponent                
                label="Customer Contact No"
                labelClass="label-sm bold"
                type="number"
                name="spocNo"
                value={this.state.spocNo}
                change={this.onChange}
                required={true}
              />
            </Col>
            <Col md="4">
              <FormComponent                
                label="Customer Contact Email"
                labelClass="label-sm bold"
                type="email"
                name="spocMail"
                value={this.state.spocMail}
                change={this.onChange}
                required={true}
              />
              <FormComponent                
                label="Effort"
                labelClass="label-sm bold"
                type="number"
                name="effort"
                value={this.state.effort}
                change={this.onChange}                
              />
              <FormComponent                
                label="Budget (millions)"
                labelClass="label-sm bold"
                type="number"
                name="budget"
                value={this.state.budget}
                change={this.onChange}                
              />
              <FormComponent                
                label="Currency"
                labelClass="label-sm bold"
                type="text"
                name="currency"
                value={this.state.currency}
                change={this.onChange}
                required={true}
              />
              <FormComponent                
                label="Location"
                labelClass="label-sm bold"
                type="text"
                name="location"
                value={this.state.location}
                change={this.onChange}
                required={true}
              />
              <FormGroup>
                <Label className="bold label-sm">Status</Label>
                <Input
                  name="status"
                  type="select"
                  className="form-control-sm"
                  onChange={this.onChange}
                  value={this.state.status}
                >
                  <option vlaue="New">New</option>
                  <option vlaue="WIP">Work in progress</option>
                  <option vlaue="Complete">Completed</option>
                  <option vlaue="Reject">Rejected</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <Label className="bold label-sm">Project Manager</Label>
                <Input
                  name="pmName"
                  type="select"
                  className="form-control-sm"
                  onChange={this.onChange}
                  value={this.state.pmName}
                >
                {this.state.managers &&
                  this.state.managers.map(item => {
                    return <option
                      key={item.empId}
                      value={`${item.firstName} ${item.lastName}`}>
                      {`${item.firstName} ${item.lastName}`}
                    </option>
                  })}
                </Input>
              </FormGroup>
              <FormComponent                
                label="Resources"
                labelClass="label-sm bold"
                type="text"
                name="resources"
                value={this.state.resources}
                change={this.onChange}                
              />
              <FormGroup>
                <Label className="bold label-sm">Project type</Label>
                <Input
                  name="projType"
                  type="select"
                  className="form-control-sm"
                  onChange={this.onChange}
                  value={this.state.projType}
                >
                  <option value="Small">Small</option>
                  <option value="Large">Large</option>
                  <option value="Service">Service</option>
                </Input>
              </FormGroup>
              <FormComponent                
                label="Billing Type"
                labelClass="label-sm bold"
                type="text"
                name="billType"
                value={this.state.billType}
                change={this.onChange}                
              />
              <FormComponent                
                label="Description"
                labelClass="label-sm bold"
                type="text"
                name="description"
                value={this.state.description}
                change={this.onChange}                
              />
              <FormComponent
                label="Remarks"
                labelClass="label-sm bold"
                type="text"
                name="remarks"
                value={this.state.remarks}
                change={this.onChange}
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
        {this.state.message && <Notifier message={this.state.message} />}
        {this.state.error && <ErrorNotifier message={this.state.error} />}
      </Container>
    );
  }
}
ProjectDetails.propTypes = {
  project: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  project: state.project
})

export default connect(
  mapStateToProps,
  { updateProject }
)(ProjectDetails);