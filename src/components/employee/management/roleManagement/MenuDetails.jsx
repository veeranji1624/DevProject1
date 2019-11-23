import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import {
  Row,
  Col,
  Form
} from 'reactstrap'
import {API} from '../../../../utils/routes'
import { Validator, submitValidator, errors } from '../../../common/Validator'
import FormComponent from '../../../common/FormComponent'
import Notifier from '../../../aside/Notifier'
import ErrorNotifier from '../../../aside/ErrorNotifier'

// import DocumentUpload from './DocumentUpload'

class ProjectDetails extends Component {
  constructor(props){
    super(props);
    console.log(this.props.MenuAccess)
    const {
      accId,
      access,
      create,
      groupId,
      roleId,
      update,
      view
    } = this.props.MenuAccess;
    this.state = {
      permissionlist: this.props.auth.permissionlist,

      edit: false,
      accId1: accId,
      roleId1: roleId,
      access1: access,
      groupId1: groupId,
      create1: create,
      update1: update,
      view1: view,
    }
    this.updateNow = this.updateNow.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidUpdate(prevProps){
    if((prevProps.auth !== this.props.auth) ){
      this.setState({
     
       permissionlist: this.props.auth.permisssionlist
      })
 
    }
  }
  updateNow(){
    this.props.update();
    this.props.back();
  }

  onChange(e){
    this.setState({
        [e.target.name]: e.target.value
    })
  }

  onSubmit(e){
    e.preventDefault();
    console.log(this.state.accId)
    let emp = {
      roleId: this.state.roleId1,
      access: this.state.access1,
      accId: this.state.accId1,
       groupId: this.state.groupId1,
      // menuId: 2,
      create: this.state.create1,
      update: this.state.update1,
      view: this.state.view1,
      delete: this.state.delete1,
    }
    console.log(emp);
    axios.post(
          `${API}/access/update`,
      emp,
      {withCredentials: true}
    )
      .then(res => {
        console.log(res.data);
        this.setState({
          message: 'Updated successfully'
        })
      })
      .catch(err => {
        this.setState({
          error: 'Could not update'
          
        })
      })
      setTimeout(() => {
        this.setState({
          message: '',
          error: ''
        })
      }, 5000)
  }
   

  componentDidMount() {
    this.setState({
      permissionlist:this.props.auth.permissionlist
      });
      // axios.get('http://localhost:1337/access/fetch', {withCredentials: true})
      // .then(res => {
      //   console.log(res.data);
      //   this.setState({
      //     data: res.data
      //   })
      // })
  }
  render() {
    console.log(this.state.access1)
    console.log(this.state.create1)
    const { permissionlist } = this.state;
    let currentPermission;    
console.log(this.props.MenuAccess.access)
     console.log(permissionlist)
    for(let x in permissionlist.response.permissions) {
      if(permissionlist.response.permissions[x].groupId == "4.3") {
        currentPermission = permissionlist.response.permissions[x];
      }
      else{
        console.log('the for loop if condition is false');
      }
    }
    return (
      <div className="project-details p-20" style={{marginTop: '-33px', width: '105%', marginLeft:'-170px'}}>
         <i
          className="material-icons pointer"
          style={{position:'absolute', top: '5px', right: '5px', color: '#C00'}}
          onClick={this.props.back}>cancel</i> 
        {/* <h5 className="center">Menu Details</h5> */}
        <hr />
        <Row>
        { !this.state.edit
          ?(<Col md="12">  
          <h5 className="center">Menu Details</h5>
        <Row>
          <Col md="6">
            <ul style={{listStyle: 'none'}}>
              <li>
                <span className="label-sm bold grouped-item">
                  Access:
                </span >
                <span className="label-sm bold grouped-item" >
                  {`${this.state.access1}`}
                </span>
              </li> 
              <li>
                <span className="label-sm bold grouped-item">
                  Group Id:
                </span>
                <span className="label-sm grouped-item">
                  {`${this.state.groupId1}`}
                </span>
              </li>
            </ul>
          </Col>
          <Col md="6">
            <ul style={{listStyle: 'none'}}>
              <li>
                <span className="label-sm bold grouped-item center">
                  Permission
                </span>
              </li>
              <li>
                <span className="label-sm bold grouped-item">
                  Create:
                </span>
                <span className="label-sm grouped-it">
                  {`${this.state.create1}`}
                </span>
              </li>
              <li>
                <span className="label-sm bold grouped-item">
                  Update:
                </span>
                <span className="label-sm grouped-it">
                  {`${this.state.update1}`}
                </span>
              </li>
              <li>
                <span className="label-sm bold grouped-item">
                  View:
                </span>
                <span className="label-sm grouped-it">
                  {`${this.state.view1}`}
                </span>
              </li>
              <li>
                <span className="label-sm bold grouped-item">
                  Delete:
                </span>
                <span className="label-sm grouped-it">
                  {`${this.state.delete1}`}
                </span>
              </li>
              
            </ul>
          </Col>
{/*           
        </Row>
        {(currentPermission.update) ?
        <div className="div">
        <div className="center">
          <button
            className="btn login-button white-text"
            onClick={this.updateNow}>
            Update
          </button>
        </div>
        {/* <DocumentUpload /> */}
        {/* </div>:null}                  */}
        {(currentPermission.update) ?
              <Row>
                <Col md="12" className="center">
                  <button
                    className="btn login-button white-text"
                    onClick={()=>this.setState({edit:!this.state.edit})}>
                    Update
                  </button>
                </Col>
                {/* <Col md="12">
                  <AgreementUpload comp={this.props.customer.compCode} />
                </Col> */}
              </Row>:null}
            </Row>
          </Col>)
          :(<Col md="12">
          <h5 className="bold center">Update Menu</h5>
          <Form onSubmit={this.onSubmit} className="p-3" noValidate>
            <Row>
              <Col md="6">
              <FormComponent
                  labelClass="bold label-sm"
                  label="accessId"                  
                  name="accId"
                  type="text"                
                  change={this.onChange}
                  value={this.state.accId1}
                  required={true}
                  disabled
                /> 
                </Col>
                <Col md="6">
              <FormComponent
                  labelClass="bold label-sm"
                  label="roleId"                  
                  name="roleId"
                  type="text"                
                  change={this.onChange}
                  value={this.state.roleId1}
                  required={true}
                /> 
                </Col>
                </Row>
                <Row>
                  <Col md="6">
              <FormComponent
                  labelClass="bold label-sm"
                  label="groupId"                  
                  name="groupId"
                  type="text"                
                  change={this.onChange}
                  value={this.state.groupId1}
                  required={true}
                />
                </Col>
                <Col md="6">                
                <FormComponent
                  labelClass="bold label-sm"
                  label="Access"                  
                  name="access1"
                  type="boolean"                
                  change={this.onChange}
                  value={this.state.access1}
                  required={true}
                /> 
                </Col>
                </Row>
                <Row>
                  <Col md="6">               
                <FormComponent
                  labelClass="bold label-sm"
                  label="Update"                  
                  name="update1"
                  type="boolean"
                  change={this.onChange}
                  value={this.state.update1}
                  required={true}
                />                
                   </Col>
                   <Col md="6">             
                <FormComponent
                  labelClass="bold label-sm"
                  label="Create"
                  name="create1"
                  type="boolean"
                  change={this.onChange}
                  value={this.state.create1}
                  required={true}
                />
                </Col>
                </Row>
                <Row>
                  <Col md="6">
                <FormComponent
                  labelClass="bold label-sm"
                  label="View"
                  name="view1"
                  type="boolean"
                  change={this.onChange}
                  value={this.state.view1}
                  required={true}
                />
                </Col>
                <Col md="6">
               <FormComponent
                  labelClass="bold label-sm"
                  label="Delete"
                  name="delete1"
                  type="boolean"
                  change={this.onChange}
                  value={this.state.delete1}
                  required={true}
                /> 
              </Col>
              </Row>
            <div className="center">
              <button
                type="submit"
                className="btn btn-custom"                
              >
                Update
              </button>
            </div>
          </Form>
          </Col>)}       
          {this.state.message?<Notifier message={this.state.message} />:null}
          {this.state.error?<ErrorNotifier message={this.state.error} />:null}
        </Row>
      </div>
    )
  }
}
ProjectDetails.propTypes = {
  auth: PropTypes.object.isRequired,
   access: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  access: state.access

});

export default connect(
  mapStateToProps,
  null
)(ProjectDetails);
