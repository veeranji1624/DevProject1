/* eslint-disable */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {  
  Row,
  Col,
  Input,
  Label
} from 'reactstrap'
import { API } from '../../../utils/routes'

class TechReports extends Component{
  constructor(props){
    super(props);
    this.state = {
      all: false,
      status: [],
      jobid: [],
      panel: [],
      message: ''
    }
    this.handleSelect = this.handleSelect.bind(this);
    this.getReport = this.getReport.bind(this);
  }

  getReport(){
    const data = {
      status: this.state.status,
      jobid: this.state.jobid,
      panel: this.state.panel,
    };
    axios.post(`${API}/candidate/excel`, data, {withCredentials: true})
      .then(res => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Report.xlsx');
        document.body.appendChild(link);
        link.click();
      })
      .catch(err => {
        this.setState({
          message: 'Failed fetching data'
        })
        setTimeout(() => {
          this.setState({
            message: ''
          })
        }, 3000)
      })
  }


  handleSelect(e){
    const { name, id, checked } = e.target;
    if(id === 'all'){
      this.setState({
        all: checked,        
      })
    }
    if(!this.state.all){
      if(id === 'status'){
        let data = this.state.status;
        const selected = data.includes(name);
        if(selected){
          data = data.filter(item => item !== name)
          this.setState({ status: data })
        } else {
          data.push(name);
          this.setState({ status: data })
        }
      }
      if(id === 'jobId'){
        let data = this.state.jobid;
        const selected = data.includes(name);
        if(selected){
          data = data.filter(item => item !== name)
          this.setState({ jobid: data })
        } else {
          data.push(name);
          this.setState({ jobid: data })
        }
      }
      if(id === 'panel'){
        let data = this.state.panel;
        const selected = data.includes(name);
        if(selected){
          data = data.filter(item => item !== name)
          this.setState({ panel: data })
        } else {
          data.push(name);
          this.setState({ panel: data })
        }
      }
    }
  }

  render(){
    let shrink;
    this.props.sidebar? shrink = 'scale': shrink =  'no-scale';
    console.log(this.state);
    const { jobs, candidates, panel } = this.props;   
    return(
      <div className={shrink} style={{ position: 'relative' }}>
        <Link to="/employee/techscreening"><i className="material-icons cancel-button">cancel</i></Link>
        <h5 className="center bold">Reports</h5>
        <Row>
          <Col md="4" className="card p-3">
            <h6 className="h6 center">Status</h6>
            <div>
              <Label className="pl-2">
                <Input type="checkbox" name="*" id="all" onChange={this.handleSelect} />All
              </Label>
              <br />
              <Label className="pl-2">
                <Input type="checkbox" name="New" id="status" onChange={this.handleSelect} />New
              </Label>
              <br />
              <Label className="pl-2">
                <Input type="checkbox" name="WIP" id="status" onChange={this.handleSelect} />Work in progress
              </Label>
              <br />
              <Label className="pl-2">
                <Input type="checkbox" name="Completed" id="status" onChange={this.handleSelect} />Completed
              </Label>
            </div>
          </Col>
          <Col md="4" className="card p-3">
            <h6 className="h6 center">Job Id</h6>
            <div>
              {jobs.data.map(job =>
                <React.Fragment>
                  <Label
                    key={job.jobId}
                    className="pl-2"
                  >
                    <Input
                      type="checkbox"
                      name={job.jobId}
                      id="jobId"
                      onChange={this.handleSelect}
                    />{job.jobId}
                    <br />
                  </Label>
                  <br />
                </React.Fragment>
              )}
            </div>
          </Col>
          <Col md="4" className="card p-3">
            <h6 className="h6 center">Panel</h6>
            <div>
              {panel.data.map(item =>
                <React.Fragment>
                  <Label
                    key={item.panelName}
                    className="pl-2">
                    <Input
                      type="checkbox"
                      name={item.panelId}
                      id="panel"
                      onChange={this.handleSelect}
                    />{item.panelName}
                  </Label>
                  <br />
                </React.Fragment>
              )}
            </div>
          </Col>
        </Row>
        <div className="center">
          <button
            onClick={this.getReport}
            className="btn login-button white-text m-2"
          >
            Download
          </button>
        </div>
        <h6 className="center">{this.state.message}</h6>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  candidates: state.tsCandidates,
  jobs: state.tsJobs,
  panel: state.tsPanel
})

export default connect(
  mapStateToProps
)(TechReports)