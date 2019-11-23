import React from 'react'
import {
  Container,
  Row,
  Col,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import {
  Formik,
  Form,
  Field
} from 'formik'
import * as Yup from 'yup'
 
 const initialValues = {
  compName: '',
  projName: '',
  spoc: '',
  endDate: ''
 };

const AddResource = (props) => {  
  let shrink;
  props.sidebar? shrink = 'scale': shrink =  'no-scale';
  return (
    <div className={shrink}>      
      <Container className="card container-card p-3">
        <h5 className="center bold">Add Resource</h5>
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            compName: Yup.string().required('Required'),
            projName: Yup.string().required('Required'),
            spoc: Yup.string().required('Required'),
            endDate: Yup.string().required('Required'),
          })}
          onSubmit={values => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2))
            }, 500)
          }}
        >
          {({values, errors, isSubmitting}) => <Form>
            <Row>
              <Col md="3"></Col>
              <Col md="6">
                <FormGroup>
                  <Label className="label-sm bold">
                    Company Name
                  </Label>
                  <Field name="compName" >
                    {({field, form}) => (
                        <Input
                          {...field}
                          type="text"
                          placeholder="Test" />
                      )}
                  </Field>
                  <small>{errors.compName && errors.compName}</small>
                </FormGroup>
                <FormGroup>
                  <Label className="label-sm bold">
                    Project Name
                  </Label>
                  <Input
                    tag={Field}
                    name="projName"
                    type="text"
                    className="form-control-sm"
                  />
                </FormGroup>
                <FormGroup>
                  <Label className="label-sm bold">
                    Customer SPOC
                  </Label>
                  <Input
                    tag={Field}
                    name="spoc"
                    type="text"
                    className="form-control-sm"
                  />
                </FormGroup>
                <FormGroup>
                  <Label className="label-sm bold">
                    Start Date
                  </Label>
                  <Input
                    tag={Field}
                    name="endDate"
                    type="date"
                    className="form-control-sm"
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
    </div>
  );
}

export default AddResource;