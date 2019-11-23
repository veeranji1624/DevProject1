import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import {
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label
} from 'reactstrap'
import Notifier from './Notifier'
import FormComponent from '../common/FormComponent'
import { UPDATE_CAREERS } from '../../utils/routes'

class JobDetails extends Component{
  constructor(props){
    super(props);
    const {
      jobRole,
      jobDesc,
      positions,
      domain,
      area,
      experience,
      skills,
      location
    } = this.props.job;
    this.state = {
      permissionlist: this.props.auth.permissionlist, 
      title: jobRole,
      description: jobDesc,
      vacancy: positions,
      domain: domain,
      area: area,
      exp: experience,
      skills: skills,
      loc: location,
      edit: false,
      message: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidUpdate(prevProps){
    if((prevProps.auth !== this.props.auth) ){
      this.setState({
     
       permissionlist: this.props.auth.permisssionlist
      })
 
    }
 
  }
  onChange(e){
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  onSubmit(e){
    e.preventDefault();
    let job = {
      jobCode: this.props.job.jobCode,
      jobRole: this.state.title,
      jobDesc: this.state.description,
      domain: this.state.domain,
      area: this.state.area,
      positions: this.state.vacancy,
      location: this.state.loc,
      skills: this.state.skills,
      experience: this.state.exp
    }
    axios.post(
      UPDATE_CAREERS,
      job,
      {withCredentials: true}
    )
      .then(res => {
        this.setState({
        message: res.data,
        edit: !this.state.edit
      });
      setTimeout(() => {
        this.setState({
          message: ''
        })
      }, 5000);
    })
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
      if(permissionlist.response.permissions[x].groupId == "4.2") {
        currentPermission = permissionlist.response.permissions[x];
      }
      else{
        console.log('the for loop if condition is false');
      }
    }
    return(
      <Row>
        {!this.state.edit
        ?(<Col md="12">
          {(currentPermission.update) ?
          <div className="div">
          <i
            className="material-icons edit-button pointer mt-5"
            style={{paddingLeft: '10px'}}
            onClick={()=>this.setState({edit:!this.state.edit})}
          >
            edit
          </i></div>:null}
          <h5 className="center bold p-3">Job Details</h5>
          <h6 className="m-3">Job role
            <span className="blue-text"> 
              { this.state.title }
            </span>
          </h6>
          <h6 className="m-3">Job description : 
            <span className="blue-text"> 
              { this.state.description }
            </span>
          </h6>
          <h6 className="m-3">Job domain : 
            <span className="blue-text"> 
              { this.state.domain }
            </span>
          </h6>
          <h6 className="m-3">Required skills : 
            <span className="blue-text"> 
              { this.state.skills }
            </span>
          </h6>
          <h6 className="m-3">Location :
            <span className="blue-text"> 
              { this.state.loc }
            </span>
          </h6>
          <h6 className="m-3">Required experience : 
            <span className="blue-text"> 
              { this.state.exp }
            </span>
          </h6>
          <h6 className="m-3">Vacancies : 
            <span className="blue-text"> 
              { this.state.vacancy }
            </span>
          </h6>
        </Col>)
        :(<Col md="12">
          <h5 className="center bold p-3">Update Jobs</h5>
          <Form onSubmit={this.onSubmit} className="p-3">
            <Row>
              <Col md="4">
                <FormComponent
                  labelClass="bold label-sm"
                  label="Job Role"
                  type="text"
                  name="title"
                  inputClass="form-control-sm"
                  placeholder="Specify job role"
                  value={this.state.title}
                  change={this.onChange}
                />
                <FormGroup>
                  <Label className="bold label-sm">Domain</Label>
                  <Input
                    name="domain"
                    type="select"
                    className="form-control-sm"
                    onChange={this.onChange}
                    value={this.state.domain}
                  >
                    <option value="Technical">Technology</option>
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                  </Input>
                </FormGroup>
                <FormComponent
                  labelClass="bold label-sm"
                  label="Skills"
                  type="text"
                  name="skills"
                  inputClass="form-control-sm"
                  placeholder="Required skills"
                  value={this.state.skills}
                  change={this.onChange}
                />
              </Col>
              <Col md="4">
                <FormComponent
                  labelClass="bold label-sm"
                  label="Vacancies"
                  type="number"
                  name="vacancy"
                  inputClass="form-control-sm"
                  placeholder="No. of vacancies available"
                  value={this.state.vacancy}
                  change={this.onChange}
                />
                <FormComponent
                  labelClass="bold label-sm"
                  label="Location"
                  type="text"
                  name="loc"
                  inputClass="form-control-sm"
                  placeholder="Job location"
                  value={this.state.loc}
                  change={this.onChange}
                />
                <FormComponent
                  labelClass="bold label-sm"
                  label="Job Description"
                  type="textarea"
                  name="description"
                  inputClass="form-control-sm"
                  placeholder=""
                  value={this.state.description}
                  change={this.onChange}
                />
              </Col>              
              <Col md="4">
                <FormComponent
                  labelClass="bold label-sm"
                  label="Area"
                  type="text"
                  name="area"
                  inputClass="form-control-sm"
                  placeholder="Enter sub-domain"
                  value={this.state.area}
                  change={this.onChange}
                />
                <FormComponent
                  labelClass="bold label-sm"
                  label="Experience"
                  type="number"
                  name="exp"
                  inputClass="form-control-sm"
                  placeholder="Years of experience required"
                  value={this.state.exp}
                  change={this.onChange}
                />
              </Col>
            </Row>
            <div className="center">
              <button
                type="submit"
                className="btn login-button white-text"
              >
                Update
              </button>
            </div>
          </Form>
        </Col>)}
        {this.state.message?<Notifier message={this.state.message} />:null}
      </Row>
    )
  }
}

JobDetails.propTypes = {
  job: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(JobDetails);