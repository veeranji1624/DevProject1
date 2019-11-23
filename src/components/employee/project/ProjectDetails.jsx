import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Row,
  Col
} from 'reactstrap'
import DocumentUpload from './DocumentUpload'

class ProjectDetails extends Component {
  constructor(props){
    super(props);
    this.state = {
      permissionlist: this.props.auth.permissionlist,
    }
    this.updateNow = this.updateNow.bind(this);
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

  componentDidMount() {
    this.setState({
      permissionlist:this.props.auth.permissionlist
      });
  }
  render() {
    console.log(this.props.detail);
    const { permissionlist } = this.state;

    let currentPermission;    


    for(let x in permissionlist.response.permissions) {
      if(permissionlist.response.permissions[x].groupId == "3.1") {
        currentPermission = permissionlist.response.permissions[x];
      }
      else{
        console.log('the for loop if condition is false');
      }
    }
    return (
      <div className="project-details p-3">
        <i
          className="material-icons pointer"
          style={{position:'absolute', top: '5px', right: '5px', color: '#C00'}}
          onClick={this.props.back}>cancel</i>
        <h5 className="center">{this.props.detail.projectName}</h5>
        <hr />
        <Row>
          <Col md="6">
            <ul style={{listStyle: 'none'}}>
              <li>
                <span className="label-sm bold grouped-item">
                  Comapany Name
                </span>
                <span className="label-sm grouped-item">
                  {this.props.detail.companyName}
                </span>
              </li>              
              <li>
                <span className="label-sm bold grouped-item">
                  Project Type
                </span>
                <span className="label-sm grouped-item">
                  {this.props.detail.projectType}
                </span>
              </li>
              <li>
                <span className="label-sm bold grouped-item">
                  Created By
                </span>
                <span className="label-sm grouped-item">
                  {this.props.detail.proCreatorId}
                </span>
              </li>
              <li>
                <span className="label-sm bold grouped-item">
                  Planned Start
                </span>
                <span className="label-sm grouped-item">
                  {this.props.detail.plannedStart}
                </span>
              </li>
              <li>
                <span className="label-sm bold grouped-item">
                  Planned End
                </span>
                <span className="label-sm grouped-item">
                  {this.props.detail.plannedEnd}
                </span>
              </li>
              <li>
                <span className="label-sm bold grouped-item">
                  Actual Start
                </span>
                <span className="label-sm grouped-item">
                  {this.props.detail.actualStart}
                </span>
              </li>
              <li>
                <span className="label-sm bold grouped-item">
                  Actual End
                </span>
                <span className="label-sm grouped-item">
                  {this.props.detail.actualEnd}
                </span>
              </li>
              <li>
                <span className="label-sm bold grouped-item">
                  Effort
                </span>
                <span className="label-sm grouped-item">
                  {this.props.detail.effort}
                </span>
              </li>
              <li>
                <span className="label-sm bold grouped-item">
                  Budget
                </span>
                <span className="label-sm grouped-item">
                  {this.props.detail.budget}
                </span>
              </li>
              <li>
                <span className="label-sm bold grouped-item">
                  Location
                </span>
                <span className="label-sm grouped-item">
                  {this.props.detail.location}
                </span>
              </li> 
              <li>
                <span className="label-sm bold grouped-item">
                  Currency
                </span>
                <span className="label-sm grouped-item">
                  {this.props.detail.currency}
                </span>
              </li>
            </ul>
          </Col>
          <Col md="6">
            <ul style={{listStyle: 'none'}}>
              <li>
                <span className="label-sm bold grouped-item">
                  Status
                </span>
                <span className="label-sm grouped-it">
                  {this.props.detail.status}
                </span>
              </li>
              <li>
                <span className="label-sm bold grouped-item">
                  Customer Spoc
                </span>
                <span className="label-sm grouped-it">
                  {this.props.detail.projCustSpoc}
                </span>
              </li>
              <li>
                <span className="label-sm bold grouped-item">
                  Spoc Contact No.
                </span>
                <span className="label-sm grouped-it">
                  {this.props.detail.projSpocContactNo}
                </span>
              </li>
              <li>
                <span className="label-sm bold grouped-item">
                  Spoc Email
                </span>
                <span className="label-sm grouped-it">
                  {this.props.detail.projSpocEmail}
                </span>
              </li>
              <li>
                <span className="label-sm bold grouped-item">
                  Project Name
                </span>
                <span className="label-sm grouped-it">
                  {this.props.detail.projPmName}
                </span>
              </li>
              <li>
                <span className="label-sm bold grouped-item">
                  Resources
                </span>
                <span className="label-sm grouped-it">
                  {this.props.detail.resources}
                </span>
              </li>
              <li>
                <span className="label-sm bold grouped-item">
                  Billing Type
                </span>
                <span className="label-sm grouped-it">
                  {this.props.detail.billingType}
                </span>
              </li>
              <li>
                <span className="label-sm bold grouped-item">
                  Added On
                </span>
                <span className="label-sm grouped-it">
                  {this.props.detail.addedOn}
                </span>
              </li>
              <li>
                <span className="label-sm bold grouped-item">
                  Updated On
                </span>
                <span className="label-sm grouped-it">
                  {this.props.detail.updatedOn}
                </span>
              </li>
              <li>
                <span className="label-sm bold grouped-item">
                  Description
                </span>
                <span className="label-sm grouped-it">
                  {this.props.detail.description}
                </span>
              </li>
              <li>
                <span className="label-sm bold grouped-item">
                  Comments
                </span>
                <span className="label-sm grouped-it">
                  {this.props.detail.comment}
                </span>
              </li>
            </ul>
          </Col>
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
        <DocumentUpload />
        </div>:null}                
      </div>
    )
  }
}
ProjectDetails.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(ProjectDetails);
