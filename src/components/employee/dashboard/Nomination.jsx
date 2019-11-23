import React, { Component } from 'react'
import axios from 'axios'
import {
  Row,
  Col,
  Form
} from 'reactstrap'
import { GET_NOMINEE, ADD_NOMINEE } from '../../../utils/routes'
import { Validator, submitValidator, errors } from '../../common/Validator'
import FormComponent from '../../common/FormComponent'
import Notifier from '../../aside/Notifier'
import ErrorNotifier from '../../aside/ErrorNotifier'

class Nomination extends Component {
  constructor(){
    super();
    this.state = {
      data: {        
        nomineeName: '',
        nomineeAge: '',
        nomineeDob: '',
        relation: '',
        nomineeAddress: '',
        nomineeContact: '',
        nomineeEmail: '',
        sharePercentage: ''
      },
      message: null,
      error: null
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount(){
    const id = {
      empId: localStorage.getItem('id')
    }
    axios.post(GET_NOMINEE, id, {withCredentials: true})
      .then(res => {
        if(res.data[0]){
          this.setState({
            data: res.data[0]
          })
        }
      })
  }
  onChange(e){
    e.preventDefault();
    Validator(e.target);
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name] : e.target.value
      }
    })
  }
  onSubmit(e){
    e.preventDefault();
    submitValidator(e.target);
    let { data } = this.state;
    let details = {
      empId: localStorage.getItem('id'),
      nomineeName: data.nomineeName,
      nomineeAge: data.nomineeAge,
      nomineeDob: data.nomineeDob,
      relation: data.relation,
      nomineeAdress: data.nomineeAddress,
      nomineeContact: data.nomineeContact,
      nomineeEmail: data.nomineeEmail,
      sharePercentage:data.sharePercentage
    }
    if(errors.valid){
      axios.post(ADD_NOMINEE, details, {withCredentials: true})
        .then(res => {
          this.setState({
            message: 'Updated Successfully'
          })
          setTimeout(() => {
            this.props.back();
          }, 2000)
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
        }, 5000)
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
    const { data } = this.state;    
    return (
      <div>
        <h5 className="bold center">Nomination Details</h5>
        <Form onSubmit={this.onSubmit} className="p-3" noValidate>
          <Row>
            <Col md="6">
              <FormComponent
                labelClass="bold label-sm"
                label="Nominee Name"
                type="text"
                name="nomineeName"
                inputClass="form-control-sm"
                value={data && data.nomineeName}
                change={this.onChange}
                required={true}
              />
              <FormComponent
                labelClass="bold label-sm"
                label="Nominee Age"
                type="number"
                name="nomineeAge"
                inputClass="form-control-sm"
                value={data && data.nomineeAge}
                change={this.onChange}
                required={true}
              />
              <FormComponent
                labelClass="bold label-sm"
                label="Date Of Birth"
                type="date"
                name="nomineeDob"
                inputClass="form-control-sm"
                value={data && data.nomineeDob}
                change={this.onChange}
                required={true}
              />
              <FormComponent
                labelClass="bold label-sm"
                label="Relation"
                type="text"
                name="relation"
                inputClass="form-control-sm"
                value={data && data.relation}
                change={this.onChange}
                required={true}
              />
            </Col>
            <Col md="6">
              <FormComponent
                labelClass="bold label-sm"
                label="Nominee Address"
                type="text"
                name="nomineeAddress"
                inputClass="form-control-sm"
                value={data && data.nomineeAddress}
                change={this.onChange}
                required={true}
              />
              <FormComponent
                labelClass="bold label-sm"
                label="Nominee Contact Number"
                type="number"
                name="nomineeContact"
                inputClass="form-control-sm"
                value={data && data.nomineeContact}
                change={this.onChange}
                required={true}
              />
              <FormComponent
                labelClass="bold label-sm"
                label="Nominee Email ID"
                type="email"
                name="nomineeEmail"
                inputClass="form-control-sm"
                value={data && data.nomineeEmail}
                change={this.onChange}
                required={true}
              />
              <FormComponent
                labelClass="bold label-sm"
                label="Share Percentage"
                type="number"
                name="sharePercentage"
                inputClass="form-control-sm"
                value={data && data.sharePercentage}
                change={this.onChange}
                required={true}
              />
            </Col>
          </Row>
          <div className="center">
            <button type="submit" className="btn login-button white-text">Update Profile</button>
          </div>
        </Form>
        {this.state.message? <Notifier message={this.state.message} />: null}
        {this.state.error? <ErrorNotifier message={this.state.error} />: null}
      </div>
    )
  }
}
export default Nomination;