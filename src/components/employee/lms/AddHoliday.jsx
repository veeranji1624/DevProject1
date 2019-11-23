import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {
  Container,
  Row,
  Col,
  Form
} from 'reactstrap'
import { ADD_HOLIDAY } from '../../../utils/routes'
import FormComponent from '../../common/FormComponent'
import Notifier from '../../aside/Notifier'
import ErrorNotifier from '../../aside/ErrorNotifier'

class AddHoliday extends Component {
  constructor(){
    super();
    this.state = {
      date: '',
      day: '',
      occassion: '',
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
    let data = {
      phCreatedBy: localStorage.getItem('id'),
      phDate: this.state.date,
      phOccassion: this.state.occassion,
      phDay: this.state.day
    }
    axios.post(ADD_HOLIDAY, data, {withCredentials: true})
      .then(res => {
        this.setState({
          message: 'Created successfully'
        })
        setTimeout(() => {
          this.setState({
            message: ''
          })
        }, 5000)
      })
      .catch(err => {
        this.setState({
          error: 'Failed to create'
        })
        setTimeout(() => {
          this.setState({
            error: ''
          })
        }, 5000)
      })
  }
  render() {
    let shrink;
    this.props.sidebar? shrink = 'scale': shrink = 'no-scale';
    return (
      <div className={shrink}>
        <Container className="container-card" style={{position: 'relative'}}>
          <Link to="/employee/lms/dashboard">
            <i className="material-icons cancel-button">cancel</i>
          </Link>
          <h5 className="bold center">Add Holiday</h5>
          <Row>
            <Col md="2"></Col>
            <Col md="8">
              <Form className="p-3" onSubmit={this.onSubmit}>
                <FormComponent
                  labelClass="bold label-sm"
                  label="Date of leave"
                  type="date"
                  name="date"
                  inputClass="form-control-sm"
                  value={this.state.date}
                  change={this.onChange}
                  required={true}
                />
                <FormComponent
                  labelClass="bold label-sm"
                  label="Day of leave"
                  type="text"
                  name="day"
                  inputClass="form-control-sm"
                  value={this.state.day}
                  change={this.onChange}
                  required={true}
                />
                <FormComponent
                  labelClass="bold label-sm"
                  label="Occassion"
                  type="text"
                  name="occassion"
                  inputClass="form-control-sm"
                  value={this.state.occassion}
                  change={this.onChange}
                  required={true}
                />
                <div className="center">
                  <button type="submit" className="btn login-button white-text">Add Holiday</button>
                </div>
              </Form>
            </Col>
          </Row>
          {this.state.message&& <Notifier message={this.state.message} />}
          {this.state.error&& <ErrorNotifier message={this.state.error} />}
        </Container>
      </div>
    )
  }
}
export default AddHoliday;