import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { addTsJob } from '../../../redux/actions/tsJobActions'
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
 
 const initialValues = {
  jobId: '',
  jobDesc: '',
  jobRole: '',
  skillSet: '',
  exp: ''
 };

const AddJobs = (props) => {
  let shrink;
  props.sidebar? shrink = 'scale': shrink =  'no-scale';
  return (
    
    
    <div className={shrink}>      
      <Container className="container-card p-2" style={{position: 'relative'}}>
        <Link to="/employee/techscreening">
          <i className="cancel-button material-icons pointer">cancel</i>
        </Link>          
        <h4 className="center bold">Add Jobs</h4>
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            jobId: Yup.string().required('Required'),
            jobDesc: Yup.string().required('Required'),
            jobRole: Yup.string().required('Required'),
            skillSet: Yup.string().required('Required'),
            exp: Yup.string().required('Required'),
          })}
          onSubmit={values => {
            let data = values;
            data.createdBy = localStorage.getItem('id');
            props.addTsJob(data, props.history);
          }}
        >
          {({values, errors, isSubmitting, touched}) => <Form>
            <Row>
              <Col md="3"></Col>
              <Col md="6">
                <FormGroup>
                  <Label className="label-sm bold">
                    JobId
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
                    Job Description
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
                    Job Role
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
                    Skillset
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
                    Experience
                  </Label>
                  <Input
                    tag={Field}
                    name="exp"
                    type="text"
                    className={`form-control-sm ${errors.exp && touched.exp && 'is-invalid'}`}
                  />
                  {errors.exp && touched.exp && <FormText className="error">{errors.exp}</FormText>}
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
      {props.message && <Notifier message={props.message} />}
    </div>
  );
}

AddJobs.propTypes = {
  addTsJob: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  message: state.tsJobs.message
})

export default connect(
  mapStateToProps,
  { addTsJob }
)(withRouter(AddJobs));