import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { addIdea } from '../../../../redux/actions/ideaActions'
import { Validator, submitValidator, errors } from '../../../common/Validator'
import FormComponent from '../../../common/FormComponent'
import Notifier from '../../../aside/Notifier'
import ErrorNotifier from '../../../aside/ErrorNotifier'
 
class NewIdea extends Component {
  constructor() {
    super();
    this.state = {
      businessIdea: '',
      statement: '',
      useCase: '',
      solution: '',
      benefits: '',
      targets: '',
      status: 'New',
      remark: '',
      attatchment: '',
      attFile: null,
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
    let data = {
      creatorId: localStorage.getItem('id'),
      businessDesc: this.state.businessIdea,
      problemStmt: this.state.statement,
      useCase: this.state.useCase,
      solution: this.state.solution,
      benefits: this.state.benefits,
      customers: this.state.targets,
      status: this.state.status,
      remarks: this.state.remark,      
    }
    if(errors.valid){
      this.props.addIdea(data, this.props.history);
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
    let shrink;
    this.props.sidebar? shrink = 'scale': shrink =  'no-scale';
    return (
      <div className={shrink}>
        <h5 className="center bold">New Idea</h5>
        <Container className="card container-card">
          <Link to="/employee/ideas">
            <i
              className="material-icons pointer cancel-button"
            >cancel</i>
          </Link>
          <Form onSubmit={ this.onSubmit } className="p-3" noValidate>
            <Row>
              <Col md="4">
                <FormComponent
                  labelClass="bold label-sm"
                  label="Business idea description"
                  type="text"
                  name="businessIdea"                    
                  value={ this.state.businessIdea }
                  change={ this.onChange }
                  placeholder="Description"
                  required={true}
                />                
                <FormComponent
                  labelClass="bold label-sm"
                  label="Problem Statement"
                  type="text"
                  name="statement"
                  value={ this.state.statement }
                  change={ this.onChange }                  
                  required={true}
                />
                <FormComponent
                  labelClass="bold label-sm"
                  label="Use cases"
                  type="text"
                  name="useCase"
                  value={ this.state.useCase }
                  change={ this.onChange }                  
                  required={true}
                />
              </Col>
              <Col md="4">
                <FormComponent
                  labelClass="bold label-sm"
                  label="Solution"
                  type="text"
                  name="solution"
                  value={ this.state.solution }
                  change={ this.onChange }                  
                  required={true}
                />              
                <FormComponent
                  labelClass="bold label-sm"
                  label="Targeted Customers"
                  type="text"
                  name="targets"
                  value={ this.state.targets }
                  change={ this.onChange }
                />
                <FormGroup>
                  <Label className="bold label-sm">status</Label>
                  <Input
                    type="select"
                    name="status"
                    className="form-control-sm"
                    value={ this.state.status }
                    onChange={ this.onChange }
                    required
                  >
                    <option value="New">New</option>
                    <option value="Evaluation">Evaluation</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Closed">Closed</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md="4">
                <FormComponent
                  labelClass="bold label-sm"
                  label="Benefits"
                  type="text"
                  name="benefits"
                  value={ this.state.benefits }
                  change={ this.onChange }                                    
                />
                <FormComponent
                  labelClass="bold label-sm"
                  label="Business idea description"
                  type="text"
                  name="remark" 
                  value={ this.state.remark }
                  change={ this.onChange }
                  required={true}
                />
              </Col>              
            </Row>
            <div className="center">
              <button
                type="submit"
                className="btn mr-5 center login-button white-text"
              >
                Add Idea
              </button>
            </div>
          </Form>
        </Container>
        {this.state.message? <Notifier message={this.state.message} />: null}
        {this.state.error? <ErrorNotifier message={this.state.error} />: null}
      </div>
    );
  }
}

NewIdea.propTypes = {
  addIdea: PropTypes.func.isRequired
}

export default connect(
  null,
  { addIdea }
)(NewIdea);