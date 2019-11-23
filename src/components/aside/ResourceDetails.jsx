import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import {
  Row,
  Col,
  Form
} from "reactstrap";
import FormComponent from '../common/FormComponent'
import { UPDATE_RESOURCE } from '../../utils/routes'
 
class ResourceDetails extends Component {
  constructor(props) {
    super(props);
    const {
      firstName,
      lastName,
      emailId
    } = this.props.employee;
    this.state = {
      projCode: firstName,
      projName: '',
      spoc: lastName,
      compName: emailId
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault();
    let emp = {
      compCode: this.props.customer.compCode,
      compFullName: this.state.cName,
      areasServed: this.state.area,
      compPocFullname: this.state.pocName,
      compPocEmail: this.state.pocMail,
      compPocMobileNumber: this.state.pocMobile
    };
    axios.post(
      UPDATE_RESOURCE,
      emp,
      {withCredentials: true}
    )
      .then(res => {
        this.setState({
          message: res.data
        });
      });
  }
  render() {
    return (
      <Form onSubmit={this.onSubmit} className="p-3">
        <Row>
          <Col md="2"></Col>
          <Col md="6">
            <FormComponent
              labelClass="bold label-sm"
              label="Company Name"
              type="text"
              name="compName"
              inputClass="form-control-sm"
              value={this.state.compName}
              change={this.onChange}
            />
            <FormComponent
              labelClass="bold label-sm"
              label="Project Name"
              type="text"
              name="projName"
              inputClass="form-control-sm"
              value={this.state.projName}
              change={this.onChange}
            />
            <FormComponent
              labelClass="bold label-sm"
              label="Project SPOC"
              type="text"
              name="spoc"
              inputClass="form-control-sm"
              value={this.state.spoc}
              change={this.onChange}
            />
            <button
              type="submit"
              className="btn btn-custom"
            >
              Update
            </button>
          </Col>
        </Row> 
      </Form>
    );
  }
}

ResourceDetails.propTypes = {
  employee: PropTypes.object.isRequired
}
export default ResourceDetails;