import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Row,
  Col
} from 'reactstrap'

class Details extends Component {
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
    const { permissionlist } = this.state;

    let currentPermission;    


    for(let x in permissionlist.response.permissions) {
      if(permissionlist.response.permissions[x].groupId == "2.2.1") {
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
        <h5 className="center">Inquiry Details</h5>
        <hr />
        <Row>
          <Col md="6">
            <ul style={{listStyle: 'none'}}>
              <li>
                <span className="label-sm bold grouped-item">
                  Contact Name
                </span>
                <span className="label-sm grouped-item">
                  {this.props.inquiry.contactName}
                </span>
              </li>
              <li>
                <span className="label-sm bold grouped-item">
                  Email ID
                </span>
                <span className="label-sm grouped-item">
                  {this.props.inquiry.emailId}
                </span>
              </li>
              <li>
                <span className="label-sm bold grouped-item">
                  COntact No.
                </span>
                <span className="label-sm grouped-item">
                  {this.props.inquiry.contactNo}
                </span>
              </li>
              <li>
                <span className="label-sm bold grouped-item">
                  Organization
                </span>
                <span className="label-sm grouped-item">
                  {this.props.inquiry.orgName}
                </span>
              </li>
              <li>
                <span className="label-sm bold grouped-item">
                  Designation
                </span>
                <span className="label-sm grouped-item">
                  {this.props.inquiry.jobRole}
                </span>
              </li>
              <li>
                <span className="label-sm bold grouped-item">
                  Contacted On
                </span>
                <span className="label-sm grouped-item">
                  {this.props.inquiry.contactedOn}
                </span>
              </li>
              <li>
                <span className="label-sm bold grouped-item">
                  Updated On
                </span>
                <span className="label-sm grouped-item">
                  {this.props.inquiry.updatedOn}
                </span>
              </li>
            </ul>
          </Col>
          <Col md="6">
            <ul style={{listStyle: 'none'}}>
              <li>
                <span className="label-sm bold grouped-item">
                  Updated By
                </span>
                <span className="label-sm grouped-item">
                  {this.props.inquiry.updatedBy}
                </span>
              </li>
              <li>
                <span className="label-sm bold grouped-item">
                  Subject
                </span>
                <span className="label-sm grouped-item">
                  {this.props.inquiry.subjectDesc}
              </span>
              </li>
              <li>
                <span className="label-sm bold grouped-item">
                  Message
                </span>
                <span className="label-sm grouped-item">
                  {this.props.inquiry.messageDesc}
                </span>
              </li>
              <li>
                <span className="label-sm bold grouped-item">
                  Status
                </span>
                <span className="label-sm grouped-item">
                  {this.props.inquiry.inqStatus}
                </span>
              </li>
              <li>
                <span className="label-sm bold grouped-item">
                  Assigned To
                </span>
                <span className="label-sm grouped-item">
                  {this.props.inquiry.assignedTo}
                </span>
              </li>
              <li>
                <span className="label-sm bold grouped-item">
                  Remarks
                </span>
                <span className="label-sm grouped-item">
                  {this.props.inquiry.inqRemarks}
                </span>
              </li>
            </ul>
          </Col>
        </Row>
        {(currentPermission.update) ?
        <div className="div">
        <hr />
        <div className="center">
          <button className="btn login-button white-text" onClick={this.updateNow}>Update?</button>
        </div></div>:null}
      </div>
    )
  }
}

Details.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(Details);
