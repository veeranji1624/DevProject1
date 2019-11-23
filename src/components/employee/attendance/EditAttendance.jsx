import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import {
  Card,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label
} from 'reactstrap'

class EditAttendance extends Component{
  constructor(props){
    super(props);
    const {
      ATTENDANCE_DATE,
      EMP_ID,
      EMP_NAME,
      TIME_IN,
      TIME_OUT,
      WORKING_HOURS
    } = this.props.attendance;
    this.state = {
      id: EMP_ID,
      date: ATTENDANCE_DATE,
      name: EMP_NAME,
      in: TIME_IN,
      out: TIME_OUT,
      hours: WORKING_HOURS,
      edit: false,
      message: '',
      error: ''
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
    let attendance = {
      attendance_date: this.state.date,
      emp_id: this.state.id,
      emp_name: this.state.name,
      time_in: this.state.in,
      time_out: this.state.out,
      workoing_hours: this.state.hours
    }
    axios.post(
      'http://localhost:5000/editattendance',
      attendance
    )
      .then(res => {
        this.setState({
          message: res.data
        })
      })
  }
  render(){
    return(
      <Card className="details-card mb-3 p-5 m-3 left shadow">
        <Row>
          {!this.state.edit
            ?(<Col md="12">
              <h5 className="mb-3 p-1">Date : 
                <span className="blue-text">
                  { this.state.date }
                </span>
              </h5>
              <h5 className="mb-3 p-1">Employee name : 
                <span className="blue-text">
                  { this.state.name }
                </span>
              </h5>
              <h5 className="mb-3 p-1">Employee ID : 
                <span className="blue-text">
                  { this.state.id }
                </span>
              </h5>
              <h5 className="mb-3 p-1">Time in : 
                <span className="blue-text">
                  { this.state.in }
                </span>
              </h5>
              <h5 className="mb-3 p-1">Time out : 
                <span className="blue-text">
                  { this.state.out }
                </span>
              </h5>
              <h5 className="mb-3 p-1">Working hours : 
                <span className="blue-text">
                  { this.state.hours }
                </span>
              </h5>
            </Col>)
            :(<Col md="12">
              <Form onSubmit={this.onSubmit}>
                <FormGroup className="row">
                  <Label className="col-md-4 bold">Attendance date</Label>
                  <Input
                    name="date"
                    type="date"
                    className="col-md-7"
                    onChange={this.onChange}
                    value={this.state.date}
                  />
                </FormGroup>
                <FormGroup className="row">
                  <Label className="col-md-4 bold">Employee ID</Label>
                  <Input
                    name="id"
                    type="text"
                    className="col-md-7"
                    onChange={this.onChange}
                    value={this.state.id}
                  />
                </FormGroup>
                <FormGroup className="row">
                  <Label className="col-md-4 bold">Employee name</Label>
                  <Input
                    name="name"
                    type="text"
                    className="col-md-7"
                    onChange={this.onChange}
                    value={this.state.name}
                  />
                </FormGroup>
                <FormGroup className="row">
                  <Label className="col-md-4 bold">Time in</Label>
                  <Input
                    name="in"
                    type="text"
                    className="col-md-7"
                    onChange={this.onChange}
                    value={this.state.in}
                  />
                </FormGroup>
                <FormGroup className="row">
                  <Label className="col-md-4 bold">Time out</Label>
                  <Input
                    name="out"
                    type="text"
                    className="col-md-7"
                    onChange={this.onChange}
                    value={this.state.out}
                  />
                </FormGroup>
                <FormGroup className="row">
                  <Label className="col-md-4 bold">Working hours</Label>
                  <Input
                    name="hours"
                    type="text"
                    className="col-md-7"
                    onChange={this.onChange}
                    value={this.state.hours}
                  />
                </FormGroup>
                <div className="center">
                  <button type="submit" className="btn btn-custom">
                    Edit attendance details
                  </button>
                </div>      
              </Form>
            </Col>)
          }
          </Row>
          <button
            className="btn btn-secondary"
            style={{ width: '90px' }}
            onClick={() => this.setState({ edit:!this.state.edit })}
          >
            Edit
          </button>
        </Card>
      )
    }
}

EditAttendance.propTypes = {
  attendance: PropTypes.object.isRequired
}
export default EditAttendance;