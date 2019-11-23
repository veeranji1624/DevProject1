import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import axios from 'axios'
import {
  Row,
  Col,
  Form,
} from 'reactstrap'
import { APPLY_LEAVE } from '../../../utils/routes'
import FormComponent from '../../common/FormComponent'
import Notifier from '../../aside/Notifier'
import ErrorNotifier from '../../aside/ErrorNotifier'

class ApplyLeave extends Component {
  constructor(props){
    super(props);
    this.state = {
      permissionlist: this.props.auth.permissionlist,
      type: '',
      startDate: '',
      endDate: '',
      remarks: '',
      message: '',
      error: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidUpdate(prevProps){
    if((prevProps.auth !== this.props.auth) ){
      this.setState({
     
        permissionlist: this.props.auth.permissionlist
      })
  
    }
  }
  onChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  onSubmit(e){
    e.preventDefault();
    let data = {
      empId: localStorage.getItem('id'),
      leaveType: this.state.type,
      fromDate: this.state.startDate,
      toDate: this.state.endDate,
      leaveRemarks: this.state.remarks
    }
    axios.post(APPLY_LEAVE, data, {withCredentials: true})
      .then(res => {
        this.setState({
          message: res.data.message
        })
        setTimeout(() => {
          this.setState({
            message: ''
          })
        }, 5000)
      })
      .catch(err => {
        this.setState({
          error: 'Application failed'
        })
        setTimeout(() => {
          this.setState({
            error: ''
          })
        }, 5000)
      })
  }

  componentDidMount(){
    this.setState({
      permissionlist:this.props.auth.permissionlist
      })
    }
  render() {
    const { permissionlist } = this.state;
    let currentPermission;

    for(let x in permissionlist.response.permissions) {
      if(permissionlist.response.permissions[x].groupId == "5.1") {
        currentPermission = permissionlist.response.permissions[x];
      }
      else{
        console.log('the for loop if condition is false');
      }
    }
    return (
      <div>
        <h5 className="bold center">Apply New Leave</h5>
        <Row>
          <Col md="2"></Col>
          <Col md="8">
            <Form className="p-3" onSubmit={this.onSubmit}>
              <FormComponent
                labelClass="bold label-sm"
                label="Type of leave"
                type="text"
                name="type"
                inputClass="form-control-sm"
                value={this.state.type}
                change={this.onChange}
                required={true}
              />
              <FormComponent
                labelClass="bold label-sm"
                label="Leave start date"
                type="date"
                name="startDate"
                inputClass="form-control-sm"
                value={this.state.startDate}
                change={this.onChange}
                required={true}
              />
              <FormComponent
                labelClass="bold label-sm"
                label="Leave end date"
                type="date"
                name="endDate"
                inputClass="form-control-sm"
                value={this.state.endDate}
                change={this.onChange}
                required={true}
              />
              <FormComponent
                labelClass="bold label-sm"
                label="Leave remarks"
                type="text"
                name="remarks"
                inputClass="form-control-sm"
                value={this.state.remarks}
                change={this.onChange}
                required={true}
              />
              {(currentPermission.create) ?
              <div className="center">
                <button type="submit" className="btn login-button white-text">Apply Leave</button>
              </div>:null}
            </Form>
          </Col>
        </Row>
        {this.state.message&& <Notifier message={this.state.message} />}
        {this.state.error&& <ErrorNotifier message={this.state.error} />}
      </div>
    )
  }
}

ApplyLeave.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  null
)(ApplyLeave);
