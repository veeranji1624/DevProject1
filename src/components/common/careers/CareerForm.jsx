import React, { Component } from "react";
import axios from 'axios'
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import {API} from '../../../utils/routes'
import Notifier from '../../aside/Notifier'
import ErrorNotifier from '../../aside/ErrorNotifier'
 
class CareerForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      phone: '',
      resume: '',
      modal: false,
      message: '',
      error: ''
    };
    this.toggle = this.toggle.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e){    
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  onFileChange(e){
    if(e.target.files[0]){
      this.setState({
        resume: e.target.files[0]
      })
    }
  }
  onSubmit(e){
    e.preventDefault();
    const data = {
      jobId: this.props.job.jobCode,
      candName: this.state.name,
      email: this.state.email,
      phone: this.state.phone
    };
    console.log(this.props.job);
    let file = this.state.resume;
    let fd = new FormData();
    fd.append('resume', file);
    axios.post(`${API}/apply/upload`, fd)
      .then(res => {
        console.log(res.data);
        data.candId = res.data.candId;
        axios.post(`${API}/apply/create`, data)
          .then(res => {
            this.setState({
              message: res.data
            })
          })
          .catch(err => {
            this.setState({
              error: 'Application failed. Please try again later'
            })
          })
      })
      setTimeout(() => {
        this.setState({
          message: '',
          error: ''
        })
      }, 5000)
  }
  toggle(){
    this.setState({
      modal: !this.state.modal
    });
  }
  render(){
    return(
      <div>
        <h6 className="left">Job Role : {this.props.job.jobRole}</h6>
        <h6 className="left">Description : {this.props.job.jobDesc}</h6>
        <h6 className="left">Domain : {this.props.job.domain}</h6>
        <h6 className="left">Req. skills : {this.props.job.skills}</h6>
        <h6 className="left">Location : {this.props.job.location}</h6>
        <span
          className="btn p-2 login-button white-text"
          onClick={this.toggle}
        >
          Apply Now
        </span>
        <Modal
          size="lg"
          isOpen={ this.state.modal }
          toggle={ this.toggle }
          className="apply-modal"
        >
          <ModalHeader toggle={this.toggle}>
            Fill the below form and apply
          </ModalHeader>
          <ModalBody>
            <Form className="p-3" onSubmit={this.onSubmit}>
              <FormGroup className="row p-3">
                <Label className="col-md-2 bold">Name
                </Label>
                <Input
                  type="text"
                  className="col-md-10"
                  name="name"
                  onChange={this.onChange}
                  value={this.state.name}
                  required
                />
              </FormGroup>
              <FormGroup className="row p-3">
                <Label className="col-md-2 bold">Email
                </Label>
                <Input
                  type="email"
                  name="email"
                  onChange={this.onChange}
                  value={this.state.email}
                  className="col-md-10"
                  required
                />
              </FormGroup>
              <FormGroup className="row p-3">
                <Label className="col-md-2 bold">Phone</Label>
                <Input
                  type="number"
                  name="phone"
                  value={this.state.phone}
                  className="col-md-10"
                  onChange={this.onChange}
                  required
                />
              </FormGroup>
              <FormGroup className="row p-3">
                <Label className="col-md-2 bold">Resume</Label>
                <Input
                  disabled
                  type="text"
                  value={this.state.resume.name}
                  onChange={this.onChange}
                  className="col-md-7"
                />
                <label className="btn file-button btn-file">
                  Browse
                  <Input
                    type="file"
                    name="resume"
                    style={{display: 'none'}}
                    className="col-md-2"
                    onChange={this.onFileChange}                    
                  />
                </label>
              </FormGroup>
              <FormGroup className="center">
                <button type="submit" className="btn white-text login-button">Apply</button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
        {this.state.message && <Notifier message={this.state.message} />}
        {this.state.error && <ErrorNotifier message={this.state.error} />}
      </div>
    );
  }
}
export default CareerForm;