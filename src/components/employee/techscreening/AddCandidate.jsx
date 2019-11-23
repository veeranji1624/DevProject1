import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { addTsCandidate } from '../../../redux/actions/tsCandidateActions'
import {
  Container,
  Row,
  Col,  
  FormGroup,
  Label,
  Input,
  FormText
} from "reactstrap";
import {
  Formik,
  Form,
  Field  
} from 'formik'
import * as Yup from 'yup'
import Notifier from '../../aside/Notifier'

class AddCandidate extends Component{
  constructor(props){
    super(props);
    this.state = {
      file: []
    }
    this.handleFile = this.handleFile.bind(this);
  }
  
  initialValues = {
    jobId: '',
    candName: '',
    contact: '',
    skypeId: '',
    email: '',
    panelName: ''    
  };

  handleFile(e){    
    this.setState({file: e.target.files[0]})
  }

  render(){
    let shrink;
    this.props.sidebar? shrink = 'scale': shrink =  'no-scale';
    console.log(this.props);
    
    
    

    return (
      <div className={shrink}>      
        <Container className="container-card p-2" style={{position: 'relative'}}>
          <Link to="/employee/techscreening">
            <i className="cancel-button material-icons pointer">cancel</i>
          </Link>
          <h4 className="bold center">Add Candidates</h4>
          <Formik
            initialValues={this.initialValues}
            validationSchema={Yup.object({
              jobId: Yup.string().required('This field is mandatory'),
              candName: Yup.string().required('This field is mandatory'),
              contact: Yup.number(),
              skype: Yup.string(),
              email: Yup.string().email('Enter a valid email'),
              panelName: Yup.string().required('This field is mandatory'),
            })}
            onSubmit={values => {
              let fd = new FormData();
              fd.append('profile', this.state.file);
              let data = values;
              data.createdBy = localStorage.getItem('id');
              data.profile = fd;
              this.props.addTsCandidate(data, this.props.history);
            }}
          >
            {({values, errors, isSubmitting, touched}) => <Form>
              <Row>
                <Col md="3"></Col>
                <Col md="6">
                  <FormGroup>
                    <Label className="label-sm bold">
                      Job Id
                    </Label>
                    <Input
                      tag={Field}                  
                      name="jobId"
                      component="select"
                      className={`form-control-sm ${errors.jobId && touched.jobId && 'is-invalid'}`}
                    >
                      {this.props.jobs.data.map(job => <option value={job.jobId}>{job.jobId}</option>)}
                    </Input>
                    {errors.jobId && touched.jobId && <FormText className="error">{errors.jobId}</FormText>}
                  </FormGroup>
                  <FormGroup>
                    <Label className="label-sm bold">
                      Candidate Name
                    </Label>
                    <Input
                      tag={Field}                  
                      name="candName"
                      type="text"
                      className={`form-control-sm ${errors.candName && touched.candName && 'is-invalid'}`}
                    />
                    {errors.candName && touched.candName && <FormText className="error">{errors.candName}</FormText>}
                  </FormGroup>
                  <FormGroup>
                    <Label className="label-sm bold">
                      Contact No.
                    </Label>
                    <Input
                      tag={Field}
                      name="contact"
                      type="text"
                      className={`form-control-sm ${errors.contact && touched.contact && 'is-invalid'}`}
                    />
                    {errors.contact && touched.contact && <FormText className="error">{errors.contact}</FormText>}
                  </FormGroup>
                  <FormGroup>
                    <Label className="label-sm bold">
                      Email Id
                    </Label>
                    <Input
                      tag={Field}
                      name="email"
                      type="email"
                      className={`form-control-sm ${errors.email && touched.email && 'is-invalid'}`}
                    />
                    {errors.email && touched.email && <FormText className="error">{errors.email}</FormText>}
                  </FormGroup>
                  <FormGroup>
                    <Label className="label-sm bold">
                      Skype Id
                    </Label>
                    <Input
                      tag={Field}
                      name="skypeId"
                      type="text"
                      className={`form-control-sm ${errors.skype && touched.skype && 'is-invalid'}`}
                    />
                    {errors.skype && touched.skype && <FormText className="error">{errors.skype}</FormText>}
                  </FormGroup>
                  <FormGroup>
                    <Label className="label-sm bold">
                      Panel
                    </Label>
                    <Input
                      tag={Field}
                      name="panelName"
                      component="select"
                      className={`form-control-sm ${errors.panelName && touched.panelName && 'is-invalid'}`}
                    >
                      {this.props.panel.data.map(member => <option value={member.panelName}>{member.panelName}</option>)}
                    </Input>
                    {errors.panelName && touched.panelName && <FormText className="error">{errors.panelName}</FormText>}
                  </FormGroup>
                  <FormGroup className="mt-4">
                    <Label className="label-sm custom-file-label">
                      {this.state.file.name? this.state.file.name: 'Choose File'}
                    </Label>
                    <Input                      
                      type="file"                      
                      onChange={this.handleFile}
                      name="profile"
                      className="custom-file-input form-control-sm"                    
                    />                    
                  </FormGroup>                
                </Col>
                <Col md="3"></Col>              
              </Row>
              <div className="center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn center white-text login-button">Submit
                </button>
              </div>
            </Form>}
          </Formik>
        </Container>
        {this.props.message && <Notifier message={this.props.message} />}
      </div>
    )
  }
}

AddCandidate.propTypes = {
  addTsJob: PropTypes.func.isRequired,
  jobs: PropTypes.object.isRequired,
  panel: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  jobs: state.tsJobs,
  panel: state.tsPanel,
  message: state.tsCandidates.message
})

export default connect(
  mapStateToProps,
  { addTsCandidate }
)(withRouter(AddCandidate));