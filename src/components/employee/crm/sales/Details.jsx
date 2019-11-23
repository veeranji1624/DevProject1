import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'reactstrap'
import AddDocument from './AddDocument'

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
      if(permissionlist.response.permissions[x].groupId == "2.3") {
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
        <h5 className="center">Sales Details</h5>
        <hr />
        <Row>
          <Col md="6">
            <ul style={{listStyle: 'none'}}>
              <li>
                <span className="label-sm bold grouped-item">
                Customer Name</span>
                <span className="label-sm grouped-item">{this.props.detail.customerName}</span>
              </li>
              <li>
                <span className="label-sm bold grouped-item">
                Domain Group</span>
                <span className="label-sm grouped-item">{this.props.detail.domainGroup}</span>
              </li>
              <li>
                <span className="label-sm bold grouped-item">
                Geolocation</span>
                <span className="label-sm grouped-item">{this.props.detail.geo}</span>
              </li>
              <li>
                <span className="label-sm bold grouped-item">
                Vertical</span>
                <span className="label-sm grouped-item">{this.props.detail.vertical}</span>
              </li>
              <li>
                <span className="label-sm bold grouped-item">
                Business Type</span>
                <span className="label-sm grouped-item">{this.props.detail.businessType}</span>
              </li>
              <li>
                <span className="label-sm bold grouped-item">
                Deal Type</span>
                <span className="label-sm grouped-item">{this.props.detail.dealType}</span>
              </li>
              <li>
                <span className="label-sm bold grouped-item">
                Estimated TCV</span>
                <span className="label-sm grouped-item">{this.props.detail.estimatedTcv}</span>
              </li>
              <li>
                <span className="label-sm bold grouped-item">
                Opportunity Type</span>
                <span className="label-sm grouped-item">{this.props.detail.opportunityType}</span>
              </li>
              <li>
                <span className="label-sm bold grouped-item">
                Status</span>
                <span className="label-sm grouped-item">{this.props.detail.status}</span>
              </li>
              <li>
                <span className="label-sm bold grouped-item">
                Win Probability</span>
                <span className="label-sm grouped-item">{this.props.detail.winProbability}</span>
              </li>
              <li>
                <span className="label-sm bold grouped-item">
                Services</span>
                <span className="label-sm grouped-item">{this.props.detail.services}</span>
              </li>
              <li>
                <span className="label-sm bold grouped-item">
                Remarks</span>
                <span className="label-sm grouped-item">{this.props.detail.remarks}</span>
              </li>
              <li>
                <span className="label-sm bold grouped-item">
                Updated On</span>
                <span className="label-sm grouped-item">
                  {this.props.detail.updatedOn}
                </span>
              </li>
            </ul>
          </Col>
          <Col md="6">
            <ul style={{listStyle: 'none'}}>
              <li>
                <span className="label-sm bold grouped-item">
                Updated By</span>
                <span className="label-sm grouped-item">{this.props.detail.updatedBy}</span>
              </li>
              <li>
                <span className="label-sm bold grouped-item">
                Customer Contact Name</span>
                <span className="label-sm grouped-item">{this.props.detail.customerContactName}</span>
              </li>
              <li>
                <span className="label-sm bold grouped-item">
                Customer Contact Designation</span>
                <span className="label-sm grouped-item">{this.props.detail.ccDesignation}</span>
              </li>
              <li>
                <span className="label-sm bold grouped-item">
                Customer Contact Mail</span>
                <span className="label-sm grouped-item">{this.props.detail.ccEmail}</span>
              </li>
              <li>
                <span className="label-sm bold grouped-item">
                Customer Contact Number</span>
                <span className="label-sm grouped-item">{this.props.detail.ccNumber}</span>
              </li>
              <li>
                <span className="label-sm bold grouped-item">
                Opportunity Owner</span>
                <span className="label-sm grouped-item">{this.props.detail.opportunityOwnerName}</span>
              </li>
              <li>
                <span className="label-sm bold grouped-item">
                Opportunity Owner Email</span>
                <span className="label-sm grouped-item">{this.props.detail.opportunityOwnerEmail}</span>
              </li>
              <li>
                <span className="label-sm bold grouped-item">
                Solution Spoc</span>
                <span className="label-sm grouped-item">{this.props.detail.solutionSpoc}</span>
              </li>
              <li>
                <span className="label-sm bold grouped-item">
                Request Received</span>
                <span className="label-sm grouped-item">{this.props.detail.requestReceivedDate}</span>
              </li>
              <li>
                <span className="label-sm bold grouped-item">
                Internal Review Date</span>
                <span className="label-sm grouped-item">{this.props.detail.internalReviewDate}</span>
              </li>
              <li>
                <span className="label-sm bold grouped-item">
                Submission Date</span>
                <span className="label-sm grouped-item">{this.props.detail.submissionDate}</span>
              </li>
              <li>
                <span className="label-sm bold grouped-item">
                Customer Presentation Date</span>
                <span className="label-sm grouped-item">{this.props.detail.customerPresentationDate}</span>
              </li>
              <li>
                <span className="label-sm bold grouped-item">
                Support Quarter</span>
                <span className="label-sm grouped-item">{this.props.detail.supportQuarter}</span>
              </li>
            </ul>
          </Col>
        </Row>
        {(currentPermission.update) ?
        <div className="div">
        <hr />
        <div className="center">
          <button className="btn login-button white-text" onClick={this.updateNow}>Update?
          </button>
        </div>
        <AddDocument id={this.props.detail.saleId} />
        </div>:null}
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