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
  Input,
  FormText
} from 'reactstrap'
import {
  FormValidator,  
  textChecker,
  numChecker
} from '../../../common/FormValidator'
import { ADD_CAREERS } from '../../../../utils/routes'
import Notifier from '../../../aside/Notifier'
import ErrorNotifier from '../../../aside/ErrorNotifier'

class AddJob extends Component {
  constructor(){
    super();
    this.state = {
      domain: 'Technology',
      title: '',
      desc: '',
      skills: '',
      exp: '',
      location: 'Bengaluru',
      vac: '',
      area: '',
      formErrors: {
        title: '',
        desc: '',
        skills: '',
        area: '',
        exp: '',
        vac: ''
      },
      message: null,
      error: null
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }
  onChange(e){
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  onBlur(e){
    const { name, value } = e.target;
    let errors = this.state.formErrors;

    switch(name){
      case 'title':
        errors.title = textChecker.test(value)? '': 'Use only alphabets, numbers and spaces';
        break;
      case 'desc':
        errors.desc = textChecker.test(value)? '': 'Use only alphabets, numbers and spaces';
        break;
      case 'skills':
        errors.skills = textChecker.test(value)? '': 'Use only alphabets, numbers and spaces';
        break;
      case 'area':
        errors.area = textChecker.test(value)? '': 'Use only alphabets, numbers and spaces';
        break;
      case 'exp':
        errors.exp = numChecker.test(value)? '': 'Please enter a proper number';
        break;
      case 'vac':
        errors.vac = numChecker.test(value)? '': 'Please enter a proper number';
        break;
      default:
        break;
    }
    this.setState({
      formErrors: errors
    }, console.log(this.state))
  }
  onSubmit(e){
    e.preventDefault();
    if(FormValidator(this.state)){
      let job = {
        jobRole: this.state.title,
        jobDesc: this.state.desc,
        positions: this.state.vac,
        domain: this.state.domain,
        loc: this.state.location,
        skills: this.state.skills,
        exp: this.state.exp
      }
      axios.post(
        ADD_CAREERS,
        job,
        {withCredentials: true}
      )
        .then(res => {
          this.setState({
            message: res.data
          })
          setTimeout(() => {
            this.props.history.push('/employee/users');
          })
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
        }, 2000);
    }else{
      this.setState({
        error: 'Please provide the required information'
      })
      setTimeout(() => {
        this.setState({
          error: null
        })
      }, 5000)
    }
  }
  render() {
    let shrink;
    this.props.sidebar? shrink = 'scale': shrink =  'no-scale';
    const { title, vac, exp, area, skills, desc } = this.state.formErrors;
    return (
      <div className={shrink}>
        <h5 className="center bold">Add New Job</h5>
        <Container className="container-card" style={{position: 'relative'}}>
          <Link to="/employee/jobs">
            <i
              className="material-icons pointer"
              style={{position:'absolute', top: '5px', right: '5px', color: '#C00'}}
            >cancel</i>
          </Link>
          <Form onSubmit={this.onSubmit} className="p-3" noValidate>
            <Row>
              <Col md="4">
                <FormGroup>
                  <Label className="bold label-sm">
                    Domain
                  </Label>
                  <Input
                    type="select"
                    name="domain"
                    className="form-control-sm"
                    value={this.state.domain}
                    onChange={this.onChange}
                  >
                    <option value="Technology">Technology</option>
                    <option value="Sales">Sales</option>
                    <option value="Support">Support</option>
                    <option value="Consulting">Consulting</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label className="bold label-sm">
                    Job Title
                  </Label>
                  <Input
                    type="text"
                    name="title"
                    className={`form-control-sm ${title && 'is-invalid'}`}
                    value={this.state.title}
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                  />
                  <FormText className="error">{title}</FormText>
                </FormGroup>
                <FormGroup>
                  <Label className="bold label-sm">
                    Area
                  </Label>
                  <Input
                    type="text"
                    name="area"
                    className={`form-control-sm ${area && 'is-invalid'}`}
                    value={this.state.area}
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                  />
                  <FormText className="error">{vac}</FormText>
                </FormGroup>
                <FormGroup>
                  <Label className="bold label-sm">
                    Skills required
                  </Label>
                  <Input
                    type="text"
                    name="skills"
                    className={`form-control-sm ${skills && 'is-invalid'}`}
                    value={this.state.skills}
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                  />
                  <FormText className="error">{skills}</FormText>
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label className="bold label-sm">
                    Experience required (years)
                  </Label>
                  <Input
                    type="number"
                    name="exp"
                    className={`form-control-sm ${exp && 'is-invalid'}`}
                    value={this.state.exp}
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                  />
                  <FormText className="error">{exp}</FormText>
                </FormGroup>
                <FormGroup>
                  <Label className="bold label-sm">
                    Job location
                  </Label>
                  <Input
                    type="select"
                    name="loc"
                    className="form-control-sm"
                    value={this.state.loc}
                    onChange={this.onChange}
                  >
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Chennai">Chennai</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label className="bold label-sm">
                    Vacancies
                  </Label>
                  <Input
                    type="number"
                    name="vac"
                    className={`form-control-sm ${vac && 'is-invalid'}`}
                    value={this.state.vac}
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                  />
                  <FormText className="error">{vac}</FormText>
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label className="bold label-sm">
                    Job Description
                  </Label>
                  <Input
                    type="textarea"
                    name="desc"
                    className={`form-control-sm ${desc && 'is-invalid'}`}
                    value={this.state.desc}
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                  />
                  <FormText className="error">{desc}</FormText>
                </FormGroup>
              </Col>
            </Row>
            {this.state.message?<Notifier message={this.state.message} />:null}
            <div className="center">
              <button type="submit" className="btn login-button white-text">
                Add Job
              </button>
            </div>
          </Form>
        </Container>
        {this.state.message? <Notifier message={this.state.message} />: null}
        {this.state.error? <ErrorNotifier message={this.state.error} />: null}
      </div>
    )
  }
}
export default AddJob;