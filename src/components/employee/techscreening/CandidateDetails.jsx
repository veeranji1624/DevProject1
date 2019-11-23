/* eslint-disable */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {  
  Row,
  Col,
  Card
} from 'reactstrap'
import CandidateProfile from './CandidateProfile'
import InitialScreen from './InitialScreen'
import FinalScreen from './FinalScreen'

class CandidateDetails extends Component{
  constructor(props){
    super(props);
    this.state = {
      candidate: this.props.candidate,
      permissionlist: this.props.auth.permissionlist,
      job: this.props.job
    }
    this.showNextCandidate = this.showNextCandidate.bind(this);
  }

  // componentDidUpdate(prevProps){
  //   if(prevProps.candidates !== this.props.candidates){
      
  //   }
  // }

  componentDidUpdate(prevProps){
    if((prevProps.auth !== this.props.auth) ){
      this.setState({
     
       permissionlist: this.props.auth.permisssionlist
      })
 
    }
 
  }

  showNextCandidate(){    
    if(this.state.candidate.feedStatus !== 'PENDING'){
      let array = this.props.candidates.data;      
      let length = array.length;      
      let index = array.findIndex(item => item.candId === this.state.candidate.candId)
      console.log(index)
      let newIndex = (index < (length - 1))? (index +1) : 0;
      let newCandidate = this.props.candidates.data[newIndex];

      let newJob = this.props.jobs.data.filter(
        job => {
          if(job.jobId === newCandidate.jobId){
            return job;
          }
        }
      )
      this.setState({ candidate: newCandidate, job: newJob[0] })
    }
  }

  componentDidMount(){
    this.setState({
      permissionlist: this.props.auth.permissionlist
    })
  }
  render(){
    const { back } = this.props;    
    const { candidate, job, permissionlist } = this.state;    
    let screen;
    if(candidate.scrStatus === 'SELECTED'){
      screen = <FinalScreen candidate={candidate} next={this.showNextCandidate} />
    }else{
      screen = null;
    } 
    
    let currentPermission;    


    for(let x in permissionlist.response.permissions) {
      if(permissionlist.response.permissions[x].groupId == "7.1") {
         currentPermission = permissionlist.response.permissions[x];
        }
      } 
    return(
      <div className="candidate-details m--5" style={{position: 'relative'}}>
        <i
          className="material-icons cancel-button pointer"
          onClick={() => back()}
        >cancel</i>
        <h5 className="bold center pb-2">Interview Details</h5>
        <Card className="p-2">
          <Row>
            <Col md="7" style={{borderRight: '1px solid #CCC'}}>
              <p className="center bold">Candidate Details</p>
              <Row>
                <Col md="6">
                  <ul style={{listStyle: 'none'}}>
                    <li>
                      <span className="label-sm bold grouped-item">
                        Candidate Id
                      </span>
                      <span className="label-sm grouped-item">
                        {candidate.candId}
                      </span>
                    </li>
                    <li>
                      <span className="label-sm bold grouped-item">
                        Name
                      </span>
                      <span className="label-sm grouped-item">
                        {candidate.candName}
                      </span>
                    </li>
                    <li>
                      <span className="label-sm bold grouped-item">
                        Email
                      </span>
                      <span className="label-sm grouped-item">
                        {candidate.email}
                      </span>
                    </li>
                    <li>
                      <span className="label-sm bold grouped-item">
                        Contact No.
                      </span>
                      <span className="label-sm grouped-item">
                        {candidate.contact}
                      </span>
                    </li>
                    <li>
                      <span className="label-sm bold grouped-item">
                        Skype Id
                      </span>
                      <span className="label-sm grouped-item">
                        {candidate.skypeId}
                      </span>
                    </li>              
                  </ul>
                </Col>
                <Col md="6">
                  <ul style={{listStyle: 'none'}}>
                    <li>
                      <span className="label-sm bold grouped-item">
                        Job Id
                      </span>
                      <span className="label-sm grouped-item">
                        {candidate.jobId}
                      </span>
                    </li>
                    <li>
                      <span className="label-sm bold grouped-item">
                        Panel Name
                      </span>
                      <span className="label-sm grouped-item">
                        {candidate.panelName}
                      </span>
                    </li>              
                    <li>
                      <span className="label-sm bold grouped-item">
                        Status
                      </span>
                      <span className="label-sm grouped-item">
                        {candidate.status}
                      </span>
                    </li>                  
                    <li>
                      <span className="label-sm bold grouped-item">
                        Selection Status
                      </span>
                      <span className="label-sm grouped-item">
                        {candidate.feedStatus}
                      </span>
                    </li>
                    <li>
                      <span className="label-sm bold grouped-item">
                        Comments
                      </span>
                      <span className="label-sm grouped-item">
                        {candidate.comments}
                      </span>
                    </li>                                
                  </ul>
                </Col>
              </Row>
            </Col>
            <Col md="5">
              <p className="center bold">Job Details</p>
              <ul style={{listStyle: 'none'}}>
                <li>
                  <span className="label-sm bold grouped-item">
                    Job Id
                  </span>
                  <span className="label-sm grouped-item">
                    {job.jobId}
                  </span>
                </li>
                <li>
                  <span className="label-sm bold grouped-item">
                    Role
                  </span>
                  <span className="label-sm grouped-item">
                    {job.jobRole}
                  </span>
                </li>
                <li>
                  <span className="label-sm bold grouped-item">
                    Description
                  </span>
                  <span className="label-sm grouped-item">
                    {job.jobDesc}
                  </span>
                </li>
                <li>
                  <span className="label-sm bold grouped-item">
                    Skills
                  </span>
                  <span className="label-sm grouped-item">
                    {job.skillSet}
                  </span>
                </li>
                <li>
                  <span className="label-sm bold grouped-item">
                    Experience
                  </span>
                  <span className="label-sm grouped-item">
                    {job.exp}
                  </span>
                </li>              
              </ul>
            </Col>
          </Row>
        </Card>
        <Row className=" m-0 mt-3">
          <Col md="7" className="m-0">
            <CandidateProfile id={this.state.candidate.candId} />
          </Col>
          {(currentPermission.update) ?
          <Col md="5" className="m-0">
            <Row>
              <Col md="12">
                <InitialScreen candidate={candidate} />
              </Col>
              <Col md="12" className="mt-3">
                {screen}
              </Col>
            </Row>          
          </Col>    
          :null}    
        </Row>      
      </div>
    )
  }
}

CandidateDetails.propTypes = {
  jobs: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  candidates: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  jobs: state.tsJobs,
  auth: state.auth,
  candidates: state.tsCandidates
})

export default connect(
  mapStateToProps
)(CandidateDetails);