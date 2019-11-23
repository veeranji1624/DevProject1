import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {  
  Jumbotron,
  Card
} from 'reactstrap'
import { getTsCandidates } from '../../../redux/actions/tsCandidateActions'
import { getTsJobs } from '../../../redux/actions/tsJobActions'
import { getTsPanel } from '../../../redux/actions/tsPanelActions'

class TsAdmin extends Component{
  constructor(props){
    super(props);
    this.state = {
      permissionlist: this.props.auth.permissionlist,
    }
    this.getData = this.getData.bind(this);
  }

  componentDidUpdate(prevProps){
    if((prevProps.auth !== this.props.auth) ){
      this.setState({
     
       permissionlist: this.props.auth.permisssionlist
      })
 
    }
 
  }

  componentDidMount(){
    this.getData();
    this.setState({
      permissionlist: this.props.auth.permissionlist
    })
  }

  getData(){
    this.props.getTsCandidates();
    this.props.getTsJobs();
    this.props.getTsPanel();
  }

  render(){
    let shrink;
    this.props.sidebar? shrink = 'scale': shrink =  'no-scale';
    const { jobs, candidates, panel } = this.props;
    const { permissionlist } = this.state;

    let currentPermission;    
    for(let x in permissionlist.response.permissions) {
      if(permissionlist.response.permissions[x].groupId == "7.1") {
         currentPermission = permissionlist.response.permissions[x];
        }
      } 
    return(
      <div className={shrink}>
        <h5 className="bold center">Admin</h5>
        <Jumbotron className="main-screening">
          <Card className="screening-card">
            <div className="screening-card-item1">
              <h1 className="bold">{jobs.data.length}</h1>
              <p className="m-0">Jobs</p>
            </div>
            <div className="screening-card-item2">
              <h5 className="bold">Jobs</h5>
              {(currentPermission.create) ?
              <div>
                <Link to="/employee/techscreening/addjob">
                  <span className="screening-card-button">
                    Add New Jobs
                  </span>
                </Link>
              </div>:null}
              <div>
                <Link to="/employee/techscreening/viewjobs">
                  <span className="screening-card-button">
                    View Available Jobs
                  </span>
                </Link>
              </div>
            </div>
          </Card>
          <Card className="screening-card">
            <div className="screening-card-item1">
              <h1 className="bold">{candidates.data.length}</h1>
              <p className="m-0">Candidates</p>
            </div>
            <div className="screening-card-item2">
              <h5 className="bold">Candidates</h5>
              {(currentPermission.create) ?
              <div>
                <Link to="/employee/techscreening/addcandidate">
                  <span className="screening-card-button">
                    Add New Candidate
                  </span>
                </Link>
              </div>:null}
              <div>
                <Link to="/employee/techscreening/viewcandidates">
                  <span className="screening-card-button">
                    View All Candidates
                  </span>
                </Link>
              </div>
            </div>
          </Card>
          <Card className="screening-card">
            <div className="screening-card-item1">
              <h1 className="bold">{panel.data.length}</h1>
              <p className="m-0">Panel</p>
            </div>
            <div className="screening-card-item2">
              <h5 className="bold">Panel</h5>
              {(currentPermission.create) ?
              <div>
                <Link to="/employee/techscreening/addpanel">
                  <span className="screening-card-button">
                    Add Panel
                  </span>
                </Link>
              </div>:null}
              <div>
                <Link to="/employee/techscreening/viewpanel">
                  <span className="screening-card-button">
                    View Panel
                  </span>
                </Link>
              </div>
            </div>
          </Card>
        </Jumbotron>
        <div>
          <Link to="/employee/techscreening/interviews">
            <button className="btn btn-info">
              All Interviews
            </button>
          </Link>
          <Link to="/employee/techscreening/reports">
            <button className="btn btn-info ml-5">
              Reports
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

TsAdmin.propTypes = {
  getTsJobs: PropTypes.func.isRequired,
  getTsCandidates: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getTsPanel: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  jobs: state.tsJobs,
  candidates: state.tsCandidates,
  auth: state.auth,
  panel: state.tsPanel
})

export default connect(
  mapStateToProps,
  { getTsJobs, getTsCandidates, getTsPanel }
)(TsAdmin);