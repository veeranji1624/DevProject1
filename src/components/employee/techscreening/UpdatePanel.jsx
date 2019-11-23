import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { updateTsPanel } from '../../../redux/actions/tsPanelActions'
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

class UpdatePanel extends Component{
  constructor(props){
    super(props);
    this.state = {}    
  }
  
  initialValues = {
    panelId: this.props.item.panelId,
    panelName: this.props.item.panelName,
    email: this.props.item.email,
    contact: this.props.item.contact,
    skype: this.props.item.skype,
    exp: this.props.item.exp,
    location: this.props.item.location,
    skills: this.props.item.skills,
    status: this.props.item.status,
    remarks: this.props.item.remarks,
    prefIntwMode: this.props.item.prefIntwMode,
    panNumber: this.props.item.panNumber,
    aadhar: this.props.item.aadhar,
    accoNumber: this.props.item.accoNumber,
    accHoldName: this.props.item.accHoldName,
    accoType: this.props.item.accoType,
    branch: this.props.item.branch,
    ifscCode: this.props.item.ifscCode
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
          <h4 className="bold center">Update Panel</h4>
          <Formik
            initialValues={this.initialValues}
            validationSchema={Yup.object({
              panelName: Yup.string().required('This field is mandatory'),
              email: Yup.string().email('Enter a valid email'),
              contact: Yup.number(),
              skype: Yup.string(),              
              exp: Yup.number().required('This field is mandatory'),
              location: Yup.string().required('This field is mandatory'),
              skills: Yup.string().required('This field is mandatory'),
              status: Yup.string().required('This field is mandatory'),              
              panNumber: Yup.string().required('This field is mandatory'),
              aadhar: Yup.string().required('This field is mandatory'),
              accoNumber: Yup.number().required('This field is mandatory'),
              accHoldName: Yup.string().required('This field is mandatory'),
              branch: Yup.string().required('This field is mandatory'),
              ifscCode: Yup.string().required('This field is mandatory')
            })}
            onSubmit={values => {              
              let data = values;
              data.updatedBy = localStorage.getItem('id');
              console.log(data)
              this.props.updateTsPanel(data, this.props.history);
            }}
          >
            {({values, errors, isSubmitting, touched}) => <Form>
              <Row>                
                <Col md="4">
                  <FormGroup>
                    <Label className="label-sm bold">
                      PanelName
                    </Label>
                    <Input
                      tag={Field}
                      name="panelName"
                      type="text"
                      className={`form-control-sm ${errors.panelName && touched.panelName && 'is-invalid'}`}
                    />
                    {errors.panelName && touched.panelName && <FormText className="error">{errors.panelName}</FormText>}
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
                      Contact No.
                    </Label>
                    <Input
                      tag={Field}
                      name="contact"
                      type="number"
                      className={`form-control-sm ${errors.contact && touched.contact && 'is-invalid'}`}
                    />
                    {errors.contact && touched.contact && <FormText className="error">{errors.contact}</FormText>}
                  </FormGroup>
                  <FormGroup>
                    <Label className="label-sm bold">
                      Skype Id
                    </Label>
                    <Input
                      tag={Field}
                      name="skype"
                      type="text"
                      className={`form-control-sm ${errors.skype && touched.skype && 'is-invalid'}`}
                    />
                    {errors.skype && touched.skype && <FormText className="error">{errors.skype}</FormText>}
                  </FormGroup>
                  <FormGroup>
                    <Label className="label-sm bold">
                      Panel Location
                    </Label>
                    <Input
                      tag={Field}
                      name="location"
                      type="text"
                      className={`form-control-sm ${errors.location && touched.location && 'is-invalid'}`}
                    />
                    {errors.location && touched.location && <FormText className="error">{errors.location}</FormText>}
                  </FormGroup>
                </Col>
                <Col md="4">
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
                  <FormGroup>
                    <Label className="label-sm bold">
                      Available skills
                    </Label>
                    <Input
                      tag={Field}
                      name="skills"
                      type="text"
                      className={`form-control-sm ${errors.skills && touched.skills && 'is-invalid'}`}
                    />                                          
                    {errors.skills && touched.skills && <FormText className="error">{errors.skills}</FormText>}
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
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Completed">Completed</option>
                    </Input>
                    {errors.status && touched.status && <FormText className="error">{errors.status}</FormText>}
                  </FormGroup>
                  <FormGroup>
                    <Label className="label-sm bold">
                      Preferred Interview Mode
                    </Label>
                    <Input
                      tag={Field}
                      name="prefIntwMode"
                      component="select"
                      className="form-control-sm"
                    >
                      <option value="Both">Both</option>
                      <option value="Skype">Skype</option>
                      <option value="Face">Face to Face</option>
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label className="label-sm bold">
                      PAN
                    </Label>
                    <Input
                      tag={Field}
                      name="panNumber"
                      type="text"
                      className={`form-control-sm ${errors.panNumber && touched.panNumber && 'is-invalid'}`}
                    />
                    {errors.panNumber && touched.panNumber && <FormText className="error">{errors.panNumber}</FormText>}
                  </FormGroup>
                  <FormGroup>
                    <Label className="label-sm bold">
                      Aadhar
                    </Label>
                    <Input
                      tag={Field}
                      name="aadhar"
                      type="text"
                      className={`form-control-sm ${errors.aadhar && touched.aadhar && 'is-invalid'}`}
                    />
                    {errors.aadhar && touched.aadhar && <FormText className="error">{errors.aadhar}</FormText>}
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <Label className="label-sm bold">
                      Bank Account Number
                    </Label>
                    <Input
                      tag={Field}
                      name="accoNumber"
                      type="text"
                      className={`form-control-sm ${errors.accoNumber && touched.accoNumber && 'is-invalid'}`}
                    />
                    {errors.accoNumber && touched.accoNumber && <FormText className="error">{errors.accoNumber}</FormText>}
                  </FormGroup>
                  <FormGroup>
                    <Label className="label-sm bold">
                      Account Holder Name
                    </Label>
                    <Input
                      tag={Field}
                      name="accHoldName"
                      type="text"
                      className={`form-control-sm ${errors.accHoldName && touched.accHoldName && 'is-invalid'}`}
                    />
                    {errors.accHoldName && touched.accHoldName && <FormText className="error">{errors.accHoldName}</FormText>}
                  </FormGroup>
                  <FormGroup>
                    <Label className="label-sm bold">
                      Account Type
                    </Label>
                    <Input
                      tag={Field}
                      name="accoType"
                      component="select"
                      className="form-control-sm"
                    >
                      <option value="Current">Current</option>
                      <option value="Salary">Salary</option>
                      <option value="Savings">Savings</option>
                    </Input>                  
                  </FormGroup>
                  <FormGroup>
                    <Label className="label-sm bold">
                      Bank Branch
                    </Label>
                    <Input
                      tag={Field}
                      name="branch"
                      type="text"
                      className={`form-control-sm ${errors.branch && touched.branch && 'is-invalid'}`}
                    />
                    {errors.branch && touched.branch && <FormText className="error">{errors.branch}</FormText>}
                  </FormGroup>
                  <FormGroup>
                    <Label className="label-sm bold">
                      IFSC Code
                    </Label>
                    <Input
                      tag={Field}
                      name="ifscCode"
                      type="text"
                      className={`form-control-sm ${errors.ifscCode && touched.ifscCode && 'is-invalid'}`}
                    />
                    {errors.ifscCode && touched.ifscCode && <FormText className="error">{errors.ifscCode}</FormText>}
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
        {this.props.panel.message && <Notifier message={this.props.panel.message} />}
      </div>
    )
  }
}

UpdatePanel.propTypes = {
  updateTsPanel: PropTypes.func.isRequired,
  jobs: PropTypes.object.isRequired,
  panel: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  jobs: state.tsJobs,
  panel: state.tsPanel
})

export default connect(
  mapStateToProps,
  { updateTsPanel }
)(withRouter(UpdatePanel));