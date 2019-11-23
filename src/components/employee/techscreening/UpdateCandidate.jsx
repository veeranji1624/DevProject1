import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { updateTsCandidate } from '../../../redux/actions/tsCandidateActions'
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

class UpdateCandidate extends Component{
  constructor(props){
    super(props);
    this.state = {
      file: []
    }
    this.handleFile = this.handleFile.bind(this);
  }
  
  initialValues = {
    candId: this.props.candidate.candId,
    contact: this.props.candidate.contact,
    skypeId: this.props.candidate.skypeId,
    email: this.props.candidate.email,
    jobId: this.props.candidate.jobId,
    panelName: this.props.candidate.panelName,
    status: this.props.candidate.status,
    candName: this.props.candidate.candName,
    feedStatus: this.props.candidate.feedStatus,
    scrStatus: this.props.candidate.scrStatus,
    comment: this.props.candidate.comment
  };

  handleFile(e){
    e.preventDefault();
    this.setState({file: e.target.files[0]})
  }

  render(){
    let shrink;
    this.props.sidebar? shrink = 'scale': shrink =  'no-scale';   
    return (
      <div className={shrink}>      
        <Container className="container-card p-2" style={{position: 'relative'}}>          
          <i
            className="cancel-button material-icons pointer"
            onClick={() => this.props.back()}
            >cancel</i>
          <h4 className="bold center">Update Candidate</h4>
          <Formik
            initialValues={this.initialValues}
            validationSchema={Yup.object({
              jobId: Yup.string().required('This field is mandatory'),
              candName: Yup.string().required('This field is mandatory'),
              contact: Yup.number(),
              skype: Yup.string(),
              email: Yup.string().email('Enter a valid email'),
              panelName: Yup.string().required('This field is mandatory'),
              status: Yup.string().required('This field is mandatory'),
              feedStatus: Yup.string(),
              comment: Yup.string(),
            })}
            onSubmit={values => {              
              let data = values;
              data.updatedBy = localStorage.getItem('id');              
              this.props.updateTsCandidate(data, this.props.history, '/employee/techscreening');
            }}
          >
            {({values, errors, isSubmitting, touched}) => <Form>
              <Row>                
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
                      {this.props.jobs.data.map(job => <option value={job.jobId}>{job.jobRole}</option>)}
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
                </Col>
                <Col md="6">
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
                  <FormGroup>
                    <Label className="label-sm bold">
                      Status
                    </Label>
                    <Input
                      tag={Field}
                      name="status"
                      component="select"
                      className={`form-control-sm ${errors.status && touched.status && 'is-invalid'}`}
                    >
                      <option value="New">New</option>
                      <option value="WIP">WIP</option>
                      <option value="Completed">Completed</option>
                    </Input>
                    {errors.status && touched.status && <FormText className="error">{errors.status}</FormText>}
                  </FormGroup>
                  <FormGroup>
                    <Label className="label-sm bold">
                      Status
                    </Label>
                    <Input
                      tag={Field}
                      name="scrStatus"
                      component="select"
                      className={`form-control-sm ${errors.scrStatus && touched.scrStatus && 'is-invalid'}`}
                    >
                      <option value="NULL">NULL</option>
                      <option value="SELECTED">SELECTED</option>
                      <option value="REJECTED">REJECTED</option>
                    </Input>
                    {errors.scrStatus && touched.feedStatus && <FormText className="error">{errors.feedStatus}</FormText>}
                  </FormGroup>
                  <FormGroup>
                    <Label className="label-sm bold">
                      Status
                    </Label>
                    <Input
                      tag={Field}
                      name="feedStatus"
                      component="select"
                      className={`form-control-sm ${errors.scrStatus && touched.scrStatus && 'is-invalid'}`}
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="SELECTED">SELECTED</option>
                      <option value="REJECTED">REJECTED</option>
                    </Input>
                    {errors.feedStatus && touched.feedStatus && <FormText className="error">{errors.feedStatus}</FormText>}
                  </FormGroup>
                  <FormGroup>
                    <Label className="label-sm bold">
                      Status
                    </Label>
                    <Input
                      tag={Field}
                      name="comment"
                      type="text"
                      className={`form-control-sm ${errors.comment && touched.comment && 'is-invalid'}`}
                    />
                    {errors.comment && touched.comment && <FormText className="error">{errors.comment}</FormText>}
                  </FormGroup>
                </Col>
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

UpdateCandidate.propTypes = {
  updateTsJob: PropTypes.func.isRequired,
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
  { updateTsCandidate }
)(withRouter(UpdateCandidate));