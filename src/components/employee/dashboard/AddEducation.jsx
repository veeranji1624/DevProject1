import React, { Component } from 'react'
import axios from 'axios'
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap'
import { UPDATE_EMPLOYEE_EDUCATION } from '../../../utils/routes'
import Notifier from '../../aside/Notifier'
import ErrorNotifier from '../../aside/ErrorNotifier'

class AddEducation extends Component {
  constructor(){
    super();
    this.state = {
      qualification: 'Bachelors',
      specialization: '',
      institute: '',
      university: '',
      completion: '',
      grade: '',
      percentage: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  onSubmit(e){
    e.preventDefault();
    const data = {
      empId: localStorage.getItem('id'),
      empQual: this.state.qualification,
      empSpeci: this.state.specialization,
      instiName: this.state.institute,
      univName: this.state.university,
      compDate: this.state.completion,
      grade: this.state.grade,
      percentage: this.state.percentage
    }    
    axios.post(UPDATE_EMPLOYEE_EDUCATION, data)
      .then(res => {
        console.log(res.data);
        this.props.alert();
      })
      .catch(err => {
        this.props.error()
      })
    this.props.back();
  }
  render() {
    return (
      <div className="project-details p-3" style={{position: 'relative'}}>
        <i className="material-icons cancel-button pointer" onClick={this.props.back}>cancel</i>
        <Form onSubmit={this.onSubmit} className="p-3">
          <Row>
            <Col md="6">
              <FormGroup>
                <Label className="label-sm bold">Qualification</Label>
                <Input
                  type="select"
                  name="qualification"
                  value={this.state.qualification}
                  onChange={this.onChange}
                  className="form-control-sm"
                  required
                >
                  <option value="PhD">PhD</option>
                  <option value="Masters">Masters</option>
                  <option value="Bachelors">Bachelors</option>
                  <option value="HS">Higher Secondary</option>
                  <option value="SSSLC">High School</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label className="label-sm bold">Specialization</Label>
                <Input
                  type="text"
                  name="specialization"
                  value={this.state.specialization}
                  onChange={this.onChange}
                  className="form-control-sm"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label className="label-sm bold">Institution</Label>
                <Input
                  type="text"
                  name="institute"
                  value={this.state.institute}
                  onChange={this.onChange}
                  className="form-control-sm"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label className="label-sm bold">University</Label>
                <Input
                  type="text"
                  name="university"
                  value={this.state.university}
                  onChange={this.onChange}
                  className="form-control-sm"
                  required
                />
              </FormGroup>
            </Col>
            <Col md="6">
            <FormGroup>
              <Label className="label-sm bold">Completed on</Label>
                <Input
                  type="date"
                  name="completion"
                  value={this.state.completion}
                  onChange={this.onChange}
                  className="form-control-sm"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label className="label-sm bold">Grade</Label>
                <Input
                  type="text"
                  name="grade"
                  value={this.state.grade}
                  onChange={this.onChange}
                  className="form-control-sm"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label className="label-sm bold">Percentage</Label>
                <Input
                  type="number"
                  name="percentage"
                  value={this.state.percentage}
                  onChange={this.onChange}
                  className="form-control-sm"
                  required
                />
              </FormGroup>
            </Col>
          </Row>
          <div className="center">
            <button type="submit" className="btn login-button white-text">Submit</button>
          </div>
        </Form>
        {this.state.message? <Notifier message={this.state.message} />:null} 
        {this.state.error? <ErrorNotifier message={this.state.error} />:null} 
      </div>
    )
  }
}
export default AddEducation;