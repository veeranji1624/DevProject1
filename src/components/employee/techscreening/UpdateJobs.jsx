import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { updateTsJob } from '../../../redux/actions/tsJobActions'
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

class UpdateJob extends Component{
  constructor(props){
    super(props);
    this.state = {}
  }
  
  initialValues = {
    reqId: this.props.job.reqId,
    jobId: this.props.job.jobId || '',
    jobRole: this.props.job.jobRole || '',
    jobDesc: this.props.job.jobDesc || '',
    skillSet: this.props.job.skillSet || '',
    exp: this.props.job.exp || 0
  };  

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
          <h4 className="bold center">Update Job</h4>
          <Formik
            initialValues={this.initialValues}
            validationSchema={Yup.object({
              jobId: Yup.string().required('This field is mandatory'),
              jobRole: Yup.string().required('This field is mandatory'),
              jobDesc: Yup.string(),
              skillSet: Yup.string(),
              exp: Yup.number()
            })}
            onSubmit={values => {              
              let data = values;
              data.updatedBy = localStorage.getItem('id');
              this.props.updateTsJob(data, this.props.history);
            }}
          >
            {({values, errors, isSubmitting, touched}) => <Form>
              <Row>                
                <Col md="3"></Col>
                <Col md="6">
                  <FormGroup>
                    <Label className="label-sm bold">
                      Job id
                    </Label>
                    <Input
                      tag={Field}                  
                      name="jobId"
                      type="text"
                      className={`form-control-sm ${errors.jobId && touched.jobId && 'is-invalid'}`}
                    />                                        
                    {errors.jobId && touched.jobId && <FormText className="error">{errors.jobId}</FormText>}
                  </FormGroup>
                  <FormGroup>
                    <Label className="label-sm bold">
                      Job role
                    </Label>
                    <Input
                      tag={Field}                  
                      name="jobRole"
                      type="text"
                      className={`form-control-sm ${errors.jobRole && touched.jobRole && 'is-invalid'}`}
                    />
                    {errors.jobRole && touched.jobRole && <FormText className="error">{errors.jobRole}</FormText>}
                  </FormGroup>
                  <FormGroup>
                    <Label className="label-sm bold">
                      Job description
                    </Label>
                    <Input
                      tag={Field}
                      name="jobDesc"
                      type="text"
                      className={`form-control-sm ${errors.jobDesc && touched.jobDesc && 'is-invalid'}`}
                    />
                    {errors.jobDesc && touched.jobDesc && <FormText className="error">{errors.jobDesc}</FormText>}
                  </FormGroup>
                  <FormGroup>
                    <Label className="label-sm bold">
                      Required skills
                    </Label>
                    <Input
                      tag={Field}
                      name="skillSet"
                      type="text"
                      className={`form-control-sm ${errors.skillSet && touched.skillSet && 'is-invalid'}`}
                    />
                    {errors.skillSet && touched.skillSet && <FormText className="error">{errors.skillSet}</FormText>}
                  </FormGroup>
                  <FormGroup>
                    <Label className="label-sm bold">
                      Years of experience
                    </Label>
                    <Input
                      tag={Field}
                      name="exp"
                      type="number"
                      className={`form-control-sm ${errors.exp && touched.exp && 'is-invalid'}`}
                    />
                    {errors.exp && touched.exp && <FormText className="error">{errors.exp}</FormText>}
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
        {this.props.jobs.message && <Notifier message={this.props.jobs.message} />}
      </div>
    )
  }
}

UpdateJob.propTypes = {
  updateTsJob: PropTypes.func.isRequired,
  jobs: PropTypes.object.isRequired,
  panel: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  jobs: state.tsJobs,
  panel: state.tsPanel
})

export default connect(
  mapStateToProps,
  { updateTsJob }
)(withRouter(UpdateJob));