/* eslint-disable */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import {
  Container,
  Row,
  Col,
  Table,
} from 'reactstrap'
import { getTsCandidates, updateTsCandidate, searchTsCandidates } from '../../../redux/actions/tsCandidateActions'
import { getTsJobs } from '../../../redux/actions/tsJobActions'
import CandidateDetails from './CandidateDetails'
import Notifier from '../../aside/Notifier'

class CandidateInterview extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: this.props.candidates.data,
      selection: null,
      selectedJob: {},
      searchItem: '',
      update: false,
      order: true,
      message: null,
      error: null
    }
    this.member = localStorage.getItem('username');
    this.select = this.select.bind(this);
    this.back = this.back.bind(this);
    this.getData = this.getData.bind(this);
    this.search = this.search.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.sortData = this.sortData.bind(this);
  }
  componentDidUpdate(prevProps){
    if(prevProps.candidates !== this.props.candidates){
      this.setState({
        data: this.props.candidates.data,
        message: this.props.candidates.message
      })
      setTimeout(() => {
        this.setState({
          message: null
        })
      }, 5000)
    }    
  }
  search(e){
    e.preventDefault();
    this.setState({
      searchTerm: e.target.value
    })
    this.onSearch(e.target.value)
  }
  onSearch(value){
    let data = {
      candName: value
    }
    this.props.searchTsCandidates(data);
  }
  select(item){
    const candJob = this.props.jobs.data.filter(
      job => {
        if(job.jobId === item.jobId){
          return job;
        }
      }
    )    
    this.setState({
      selection: item,
      selectedJob: candJob[0] ? candJob[0] : candJob,
      update: true
    })
  }
  getData(){
    this.props.getTsCandidates();
    this.props.getTsJobs();
  }
  componentDidMount(){
    this.getData()
  }
  back(){
    this.setState({
      update: false
    })
    this.getData();
  }
  sortData(){
    let array = this.state.data;
    array.sort(
      (a, b) => {
        let jobA = a.jobId.toUpperCase();
        let jobB = b.jobId.toUpperCase();
        if(jobA > jobB){
          let order = this.state.order? -1: 1;
          return order;
        }
        if(jobA < jobB){
          let order = this.state.order? 1: -1;
          return order;
        }
        return 0;
      })
    this.setState({ data: array, order: !this.state.order })
  }
  tableData = stat =>
    <Table className="interview-table">
      <thead className="interview-table-head">
        <tr className="row100">
          <th className="bold label-sm center pointer" onClick={this.sortData}>Id</th>
          <th className="bold label-sm center">Job</th>
          <th className="bold label-sm center">Name</th>
        </tr>
      </thead>
      <tbody>
      {this.state.data.map(
        item => {
          if(item.status === stat){
            return <tr
              className="interview-table-item"
              key={item.candId}
              onClick={() => this.select(item)}>
              <td className="label-sm center">{item.candId}</td>
              <td className="label-sm center">{item.jobId}</td>
              <td className="label-sm center">{item.candName}</td>
            </tr>
          }
        })
      }
      </tbody>
    </Table>

  render() {
    let shrink;
    this.props.sidebar? shrink = 'scale': shrink =  'no-scale';
    const { selection, selectedJob, update, message } = this.state;
    return (
      <div className={shrink}>                
        {!update
        ?(<Container className="card container-card" style={{position: 'relative'}}>
          <Link to="/employee/techscreening">
            <i className="material-icons cancel-button cancel">cancel</i>
          </Link>
          <input
            type="text"
            onChange={this.search}
            value={this.state.searchTerm}
            className="searchfield form-control-sm mr-3"
            placeholder="Search" />        
          <h5 className="bold pointer center pt-2">Candidates</h5>
          <Row>
            <Col md="4" className="card p-2"
            >
              <h6 className="center bold m-2">New</h6>
              {this.tableData('New')}
            </Col>
            <Col md="4" className="card p-2"
            >
              <h6 className="center bold m-2">Work in progress</h6>
              {this.tableData('WIP')}
            </Col>
            <Col md="4" className="card p-2">
              <h6 className="center bold m-2">Completed</h6>
                {this.tableData('Completed')}
            </Col>
          </Row>
        </Container>)
        :<CandidateDetails candidate={selection} job={selectedJob} back={this.back} />
        }
        {message && <Notifier message={message} />}
      </div>
    )
  }
}

CandidateInterview.propTypes = {
  candidates: PropTypes.object.isRequired,
  jobs: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getTsCandidates: PropTypes.func.isRequired,
  getTsJobs: PropTypes.func.isRequired,
  updateTsCandidate: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  candidates: state.tsCandidates,
  jobs: state.tsJobs,
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { getTsCandidates, updateTsCandidate, searchTsCandidates, getTsJobs }
)(withRouter(CandidateInterview));