import React, { Component } from 'react'
import axios from 'axios'
import {
  Row,
  Col
} from 'reactstrap'
import { EMPLOYEE_EDUCATION } from '../../../utils/routes'
import AddEducation from './AddEducation'
import AddCertification from './AddCertification'
import Notifier from '../../aside/Notifier'
import ErrorNotifier from '../../aside/ErrorNotifier'

class EducationDetails extends Component{
  constructor(){
    super();
    this.state = {
      data: [],
      updateEdu: false,
      updateCert: false,
      message: null,
      error: null
    }
    this.addEducation = this.addEducation.bind(this);
    this.addCertification = this.addCertification.bind(this);
    this.setMessage = this.setMessage.bind(this);
    this.setError = this.setError.bind(this);
  }
  componentDidMount(){
    const data = {
      empid: localStorage.getItem('id')
    }
    axios.post(
      EMPLOYEE_EDUCATION,
      data,
      {withCredentials: true}
    ).then(res => {
      this.setState({
        data: res.data
      })
    })
  }
  addEducation(){
    this.setState({
      updateEdu: !this.state.updateEdu,
      updateCert: false
    })
  }
  addCertification(){
    this.setState({
      updateEdu: false,
      updateCert: !this.state.updateCert
    })
  }
  setMessage(){
    this.setState({ message: 'Added Successfully' })
    setTimeout(() => {
      this.setState({ message: null })
    }, 5000)
  }
  setError(){
    this.setState({ error: 'Could not update' })
    setTimeout(() => {
      this.setState({ error: null })
    }, 5000)
  }
  render(){
    let shrink;
    this.props.sidebar? shrink = 'scale' : shrink = 'no-scale';
    const { data, updateEdu, updateCert } = this.state;
    return(
      <div className={shrink}>        
        {updateEdu?
          <AddEducation
            back={this.addEducation}
            alert={this.setMessage}
            error={this.setError}
          /> :null}
        {updateCert?
        <AddCertification
          back={this.addCertification}
          alert={this.setMessage}
          error={this.setError}
        /> :null}
        <div style={{position: 'relative'}} className="card mt-3 p-3">
          <button
            className="btn add-button white-text label-sm"
            onClick={this.addEducation}
          >Add</button>
          <h4 className="bold center">Education</h4>
          <Row className="p-3">
            {data && data.map(item => {
              return <Col id={item.empEduId} md="4" className="p-2 card">
                <p className="bold">{item.empQual}</p>
                <p className="bold">{item.empSpeci}</p>
                <p className="bold">{item.instiName}</p>
                <p className="bold">{item.univName}</p>
                <p className="bold">{item.grade}</p>
                <p className="bold">{item.percentage}</p>
                <p className="bold">{item.compDate}</p>
              </Col>
            })
            }
          </Row>
        </div>
        <hr />
        <div style={{position: 'relative'}} className="card mt-3 p-3">
          <button
            className="btn add-button white-text label-sm"
            onClick={this.addCertification}  
          >Add</button>
          <h4 className="bold center">Certifications</h4>
          <Row className="p-3">
            {data && data.map(item => {
              return <Col id={item.emp_id} md="4" className="p-2 card">
                <p className="bold">{item.empCert}</p>
                <p className="bold">{item.empSpeci}</p>
                <p className="bold">{item.certName}</p>
                <p className="bold">{item.grade}</p>
                <p className="bold">{item.percentage}</p>
                <p className="bold">{item.compDate}</p>
              </Col>
            })  
            }            
          </Row>
        </div>
        {this.state.message? <Notifier message={this.state.message} /> :null}
        {this.state.error? <ErrorNotifier message={this.state.error} /> :null}
      </div>
    )
  }
}
export default EducationDetails;
